import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { Product } from '../models/Product';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ProductService } from './product.service';
@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

   shoppingList: Product[] = new Array<Product>();
   shoppingListObs = new BehaviorSubject<Product[]>([]);
   countAdd = 1;

  constructor(private storage: Storage, private alertController: AlertController,
             ) {


    this.storage.get('shoppingList').then((val) => {

      if (val !== null) {
      this.shoppingList = val;
      }
      this.shoppingListObs.next(this.shoppingList);
   });

  }

  getShoppingList(): Observable<Array<Product>> {
    return this.shoppingListObs.asObservable();
  }

  isInShoppingList(value: string): boolean {
    if (this.shoppingList.filter((myProd) => myProd.barcode === value).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  addProductToShoppingList(value: Product) {
    if (typeof value.quantity === 'undefined') {
      value.quantity = 1;
    }

    this.shoppingList.push(value);
    this.storage.set('shoppingList', this.shoppingList);
    this.shoppingListObs.next(this.shoppingList);
  }

  async askAddProductToShoppingList(value: Product) {
    if (this.shoppingList.filter((myProd) => myProd.barcode === value.barcode).length > 0) {
      if (this.shoppingList.filter((myProd) => myProd.barcode === value.barcode)[0].quantity > 0) {
        this.countAdd = this.shoppingList.filter((myProd) => myProd.barcode === value.barcode)[0].quantity;
      }
    }

    const alert = await this.alertController.create({
      cssClass: 'myAlertAddProductToShoppingList',
      // header: '  <div class="test"> ile produktow? </div>',
      message: `
               <div>
                 <div class="center-in-alert">
                   <h5>
                      Podaj ilość produktów:
                   </h5>
                 </div>
                 <div class="center-in-alert">
                    <span id="count">
                      ilość: ${this.countAdd}
                    </span>
                 </div>
               </div>
               `,
      buttons: [
        {
          text: 'Dodaj',
          handler: () => {

            if ( this.shoppingList.filter((myProd) => myProd.barcode === value.barcode).length === 0
                && this.countAdd > 0 ) {
                value.quantity = this.countAdd;
                this.addProductToShoppingList(value);
            } else {
              this.shoppingList.forEach(element => {
                if (element.barcode === value.barcode) {
                  element.quantity = this.countAdd;
                }
              });
              this.storage.set('shoppingList', this.shoppingList);
              this.shoppingListObs.next(this.shoppingList);
            }
            this.countAdd = 1;
          }
        },
        {
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
            document.getElementById('count').innerHTML = 'ilość: ' + this.countAdd.toString();
            return false;
           }
        },
        {
          cssClass: 'myButton',
          text: '-',
          handler: () => {
            if (this.countAdd > 0) {
              this.countAdd--;
              document.getElementById('count').innerHTML = 'ilość: ' + this.countAdd.toString();
            }
            return false;
          }
        },

      ]
    });

    await alert.present();
  }

  deleteProductFromShoppingList(value: string) {
    this.shoppingList = this.shoppingList.filter((product) => product.barcode !== value );
    this.storage.set('shoppingList', this.shoppingList);
    this.shoppingListObs.next(this.shoppingList);
  }

  clearShoppingList() {
    this.shoppingList = [];
    this.storage.set('shoppingList', this.shoppingList);
    this.shoppingListObs.next(this.shoppingList);
  }

  incrementCount(value: string) {
    this.shoppingList.forEach(element => {
      if (element.barcode === value) {
        element.quantity++;
      }

    });
    this.storage.set('shoppingList', this.shoppingList);
    this.shoppingListObs.next(this.shoppingList);
  }

  decrementCount(value: string) {
    this.shoppingList.forEach(element => {
      if (element.barcode === value) {
        element.quantity--;
      }

    });
    this.shoppingList = this.shoppingList.filter((product) => product.quantity !== 0);
    this.storage.set('shoppingList', this.shoppingList);
    this.shoppingListObs.next(this.shoppingList);
  }


}

  
/*
updateShoppingList() {
    var tempShoppingList: Product[] = new Array<Product>();
    //var tempProducts: Product[] = new Array<Product>();

    this.productService.getProducts().subscribe(((products) => {

      console.log('pula produktów');
      for (let index = 0; index < this.shoppingList.length; index++) {

        console.log(products.filter((item) => item.barcode === this.shoppingList[index].barcode)[0].quantity);
        console.log(this.shoppingList.filter((item) => item.barcode === this.shoppingList[index].barcode)[0].quantity);
        let product: Product = products.filter((item) => item.barcode === this.shoppingList[index].barcode)[0];
        product.quantity = this.shoppingList.filter((item) => item.barcode === this.shoppingList[index].barcode)[0].quantity;
   
        tempShoppingList.push(product);

    }
    this.shoppingList=tempShoppingList;
    //this.shoppingListObs.next(this.shoppingList);
    console.log(this.shoppingList);

    }));
    
  }

*/
