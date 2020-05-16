import { Component, OnInit, ElementRef, ViewChild, Renderer } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ProductService } from '../services/product.service';
import { Product } from '../models/Product';
// import { map } from 'rxjs/operators';
import { BillService } from '../services/bill.service';
import { Bill } from '../models/Bill';
import { AuthService } from '../services/auth.service';
import { LocalDataService } from '../services/local-data.service';
import { Animation, AnimationController } from '@ionic/angular';
import { AppService } from '../services/app.service';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';
// import * as firebase from 'firebase';
@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
 @ViewChild('products', {static: true}) squareB: any;

  num: string;
  allProducts: Array<any>;
  barcode: string;
  countAdd = 1;
  countDel = 1;
  count = 0;

  constructor(public navCtrl: NavController,
              private barcodeScanner: BarcodeScanner,
              private productService: ProductService,
              private billService: BillService,
              private authService: AuthService,
              private localDataService: LocalDataService,
              private animationCtrl: AnimationController,
              private renderer: Renderer,
              private appService: AppService,
              public modalController: ModalController,
              public alertController: AlertController) {

               // this.mapa.set(111, 2);
               // console.log(this.mapa.get(111).toString());
               // this.mapa.set(111, this.mapa.get(111) + 2);
               // console.log(this.mapa.get(111).toString());

  }

  ngOnInit() {
    this.getProducts();
    //this.checkSummaryBill();
  }

  async funScan() {
    if (this.allProducts.some((product: Product) => product.barcode === this.num)) {

      var prod = new Array<Product>();
      prod = this.allProducts.filter((product: Product) => product.barcode === this.num);
      if ( this.localDataService.isInShoppingList(prod[0].barcode)) {
         console.log('jest na liście');

         this.renderer.setElementStyle( this.squareB.nativeElement, 'visibility', 'visible' );
         const squareA = this.animationCtrl.create()
         .addElement(this.squareB.nativeElement)
         .fill('none')
         .duration(2000)
         .keyframes([
           { offset: 0, transform: 'scale(1)', opacity: '1' },
           { offset: 0.5, transform: 'scale(1.2)', opacity: '0.3' },
           { offset: 1, transform: 'scale(1)', opacity: '1' }
         ]);
         await squareA.play();
         this.renderer.setElementStyle( this.squareB.nativeElement, 'visibility', 'hidden' );

      } else {
        console.log('nie ma na liście');
      }
      this.presentFound(prod);
      this.barcode = '';

     } else {
       if (this.num !== '' ) {
         this.presentNotFound();
       }
     }
  }

  async changeInput() {
    if (this.barcode.length === 13) {
      this.num = this.barcode;
      this.funScan();
    }
  }

  scan() {
    this.barcodeScanner.scan().then(async data => {
        this.num = data.text;
        this.funScan();
      });
  }

  removeMyProduct(barcode: string) {
   this.confirmRemoveMyProduct(barcode);

  }

  async presentNotFound() {
    const alert = await this.alertController.create({
      header: 'nie znaleziono produktu',
      message: 'spróbuj jeszcze raz!',
      buttons: ['OK']
    });

    await alert.present();
  }

  async confirmRemoveMyProduct(barcode: string) {
    const alert = await this.alertController.create({
      cssClass: 'myAlertAddProductToShoppingList',
      // header: 'Ile sztuk chcesz wyjąć z koszyka?',
      message: `<div>
                  <div class="center-in-alert">
                    <h5>
                      Ile sztuk chcesz wyjąć z koszyka?
                    </h5>
                    </br>
                  </div>
                  <div class="center-in-alert">
                    <span id="count">
                      ilość: ${this.countDel} szt.
                    </span>
                  </div>
                </div>`
       ,
      buttons: [
        {
          text: 'usuń',
          handler: () => {
            this.appService.myProducts.forEach( item => {
              if (item.barcode === barcode) {
                if ( (item.quantity - this.countDel) < 1 ) {
                  this.appService.myProducts = this.appService.myProducts.filter(bc => bc.barcode !== barcode);
                } else {
                  item.quantity -= this.countDel;
                }
              }
            });

            this.appService.sum = 0;
            this.appService.myProducts.forEach( item => this.appService.sum += item.price * item.quantity );
            this.countDel = 1;
          }
        },
        {
          text: 'anuluj',
          role: 'cancel',
          handler: () => {
            this.countDel = 1;
          }
        },
        {
          cssClass: 'myButton',
          text: '+',
          handler: () => {
            this.appService.myProducts.forEach( item => {
              if (item.barcode === barcode) {
                if (item.quantity > this.countDel) {
                  this.countDel++;
                  document.getElementById('count').innerHTML = 'ilość: ' + this.countDel.toString() + ' szt.';
                  console.log('na stanie ' + item.quantity);
                  console.log('chce odjąc ' + this.countDel);
                }
              }
            });
            return false;
           }
        },
        {
          cssClass: 'myButton',
          text: '-',
          handler: () => {
            if (this.countDel > 0) {
              this.countDel--;
              document.getElementById('count').innerHTML = 'ilość: ' + this.countDel.toString() + ' szt.';
            }
            return false;
          }
        }
      ]
    });

    await alert.present();
  }



  isInMyProducts(barcode: string): boolean {
    if (this.appService.myProducts.filter(e => e.barcode === barcode).length === 0) {
        return false;
    }
    return true;
  }

  async presentFound(product: Array<Product>) {

    if (this.isInMyProducts(product[0].barcode)) {
      this.countAdd = product[0].quantity;
      this.countAdd += 1;
    }

    const alert = await this.alertController.create({
       cssClass: 'myAlertFound',
      // header: product[0].name,
      // subHeader: 'xd',
      message: (!this.localDataService.isInShoppingList(product[0].barcode)) ? `
               <div>

                  <div class="center-in-alert">
                    <h6>
                      ${product[0].name}
                    </h6>
                    </br>
                  </div>
                  <div class="center-in-alert">
                     ${this.appService.getPriceForHTML(product[0].id)}
                  </div
                  </br>
                  </br>
                  <div class="center-in-alert">
                      <img src="${product[0].image}">
                  </div>

                  <div class="center-in-alert" id="count">
                    <span>ilość: ${this.countAdd} szt.</span>
                  </div>
                  </br>
                  </br>
               </div>
               `
               :

                `<div>

               <div class="center-in-alert">
                 <h6>
                   ${product[0].name}
                 </h6>
                 </br>
               </div>
               <div class="center-in-alert">
                  ${this.appService.getPriceForHTML(product[0].id)}
               </div
               </br>
               </br>
               <div class="center-in-alert">
                   <img src="${product[0].image}">
               </div>

               <div class="center-in-alert" id="count">
                 <span>
                   ilość: ${this.countAdd} szt.
                 </span>
               </div>
               </br>
               <div class="center-in-alert">
                  <span>na liście: ${this.localDataService.shoppingList.filter(
                      (item) =>  item.barcode === product[0].barcode )[0].quantity} szt.
                  </span>
                </div>
               </br>
            </div>`,
      buttons: [
        {
         // cssClass: 'myButton',
          text: 'OK',
          handler: () => {
            if ( this.countAdd > 0 ) {
           // if (this.appService.myProducts.filter(e => e.barcode === product[0].barcode).length === 0) {
              if (!this.isInMyProducts(product[0].barcode)) {
              product[0].quantity = this.countAdd;
              product[0].price = this.appService.getPromoPrice(product[0].id);
              let t = this.appService.myProducts.push(product[0]);
            } else {
              this.appService.myProducts.forEach( item => {
                if (item.barcode === product[0].barcode) {
                  item.quantity = this.countAdd;
                  // product[0].quantity = this.countAdd;
                }
              });
            }
          }

            this.countAdd = 1;
            this.appService.sum = 0;
            this.appService.myProducts.forEach( item => this.appService.sum += item.price * item.quantity );

          }
        },
        {
          // cssClass: 'myButton',
          text: 'Anuluj',
          role: 'cancel',
          handler: () => {
            this.countAdd = 1;
          }
        },
        {
         cssClass: 'myButton',
          text: '+',
          handler: () => {
            this.countAdd++;

            document.getElementById('count').innerHTML = 'ilość: ' + this.countAdd.toString() + ' szt.';
            return false;
           }
        },
        {

          cssClass: 'myButton',
          text: '-',
          handler: () => {
            if (this.countAdd > 0) {
              this.countAdd--;
              document.getElementById('count').innerHTML = 'ilość: ' + this.countAdd.toString() + ' szt.';
            }
            return false;
          }
        },

      ]
    });

    await alert.present();
  }

  getProducts() {
    this.productService.getProducts().subscribe(((allProducts) => {
      this.allProducts = allProducts; // .sort(this.compare); // .filter((task: Task) => task.name === 'f 31.60.228.28');
    }));
  }

  showMissingproducts(): string {
    let missingProducts = new Array<any>();

    this.localDataService.shoppingList.forEach((product) => {

      if (this.appService.myProducts.filter( (item) => item.barcode === product.barcode).length === 0) {
        if (this.appService.isInMyShop(product.id)) {
          missingProducts.push(product);
        }
      }
    } );
    // console.log(missingProducts);

    let element;
    element = '<div class = "missingProducts">';
    element += '<div class="missingProductsHeaderWrapper">' +
                    '<div class="missingProductsHeader">' +
                        'Ups... nie wszystkie produkty z listy są w twoim koszyku: ' +
                    '</div>' +
               '</div>';

    missingProducts.forEach((item) => { element += '<p>' + item.name + ' ' + item.quantity +  'szt. </p>'; });

    element += '<div>';
    return element;
  }

  async checkSummaryBill() {
    if ( this.allProductsFromShoppingListAreAddedToMyProducts() ) {
      this.summaryBill();
    } else {
      // console.log('lista nie spełniona');
      var options = {
      cssClass: 'missingProducts',
      // title: 'Choose the name',
      message: this.showMissingproducts(),
      buttons: [
        {
          text: 'Wróc do zakupów',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'zakończ',
          handler: () => {
            this.summaryBill();
          }
        }
      ],
    };

      let alert = await this.alertController.create(options);
      await alert.present();

    }
  }

  allProductsFromShoppingListAreAddedToMyProducts(): boolean {

    let flag = true;
    this.localDataService.shoppingList.forEach((product) => {

      if (this.appService.myProducts.filter( (item) => item.barcode === product.barcode).length === 0) {
        flag = false;
      }
    } );

    return flag;
  }

  async summaryBill() {
    const alert = await this.alertController.create({
      cssClass: 'summaryBill',
      // header: `płatność`,
      message: `<div>
                  <div class="center-in-alert">
                    <div class="summaryBillHeaderWrapper">
                      <span class="summaryBillHeader">
                        płatność
                      </span>
                    </div>
                  </div>
                  <div class="center-in-alert">
                    <span> twój rachunek: </span>
                    <span id="count"> ${this.getSum()} zł</span>
                  </div>
                </div>` ,
      buttons: [
        {
          text: 'anuluj',
          role: 'cancel',
          handler: () => {
            console.log('anulowano');
          }
        },
        {
          text: 'zapłać',
          handler: () => {
            console.log('zapłacono');
            this.addBill();

          }
        }
      ]
    });

    await alert.present();
  }

  addBill() {

    // this.appService.myProducts.forEach((product) => { product.quantity = this.mapa.get(product.barcode); } );
    const bill: Bill = {
      email: this.authService.getUserName(),
      date: this.appService.getTime(),
      price: +this.getSum(),
      products: this.appService.myProducts
    };
    this.billService.addBill(bill);
    this.appService.myProducts = new Array<any>();
    if (this.localDataService.shoppingList.length > 0){
      this.askClearShoppingList();
    }
  }

  async askClearShoppingList() {
    const alert = await this.alertController.create({
      cssClass: 'summaryBill',
      // header: 'Zachować listę zakupów?',
      message: `<div>
                <div class="center-in-alert">
                  <div class="summaryBillHeaderWrapper">
                    <span class="summaryBillHeader">
                      lista zakupów
                    </span>
                  </div>
                </div>
                <div class="center-in-alert">
                  <span> Zachować listę zakupów?</span>
                </div>
              </div>`,
      buttons: [
        {
          text: 'Wyczyść',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
            this.localDataService.clearShoppingList();
          }
        }, {
          text: 'Zachowaj',
          // handler: () => {
           // console.log('Confirm Okay');
          // }
        }
      ]
    });

    await alert.present();
  }

  getSum() {
    return (Math.round(this.appService.sum * 100) / 100).toFixed(2);
  }

}


/*


getTime(): string {



    let YYYY = new Date().getFullYear().toString();
    let MM = new Date().getMonth().toString();
    // tslint:disable-next-line: radix
    const MMM = parseInt( MM ) + 1;
    MM = MMM.toString();
    let DD = new Date().getDate().toString();
    let hh = new Date().getHours().toString();
    let mm = new Date().getMinutes().toString();
    let ss = new Date().getSeconds().toString();


    // tslint:disable-next-line: radix
    if ( parseInt ( MM ) < 10) { MM = '0' + MM; }

    // tslint:disable-next-line: radix
    if ( parseInt ( DD ) < 10) { DD = '0' + DD; }

      // tslint:disable-next-line: radix
    if ( parseInt ( hh ) < 10) { hh = '0' + hh; }

      // tslint:disable-next-line: radix
    if ( parseInt ( mm ) < 10) {  mm = '0' + mm; }

      // tslint:disable-next-line: radix
    if ( parseInt ( ss ) < 10) { ss = '0' + ss; }


    return  YYYY + '.' + MM + '.' + DD + ' ' + hh + ':' + mm + ':' + ss;

  }

*/

/*
  testAdd(product: Array<Product>) {

  if (this.countAdd > 0) {
    if (this.appService.myProducts.filter(e => e.barcode === product[0].barcode).length === 0) {
      product[0].quantity = this.countAdd;
      product[0].price = this.appService.getPromoPrice(product[0].id);
      let t = this.appService.myProducts.push(product[0]);
    } else {
      this.appService.myProducts.forEach( item => {
        if (item.barcode === product[0].barcode) {
          item.quantity += this.countAdd;
          // product[0].quantity = this.countAdd;
        }
      });
    }
  }

    this.countAdd = 1;
    this.appService.sum = 0;
    this.appService.myProducts.forEach( item => this.appService.sum += item.price * item.quantity );

}

test(){
  console.log('xd');
}
*/
