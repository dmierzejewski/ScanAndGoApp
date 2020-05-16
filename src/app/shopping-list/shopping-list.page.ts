import { Component, OnInit } from '@angular/core';
import { LocalDataService } from '../services/local-data.service';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';
import { AppService } from '../services/app.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
// import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
})
export class ShoppingListPage implements OnInit {

  shoppingList: Array<Product> = new Array<Product>();
  constructor(public localDataService: LocalDataService,
              private productService: ProductService,
              private router: Router,
              public appService: AppService,
              public alertController: AlertController
              ) {
    

      localDataService.getShoppingList().subscribe( (shoppingList: Array<Product>) => {
          this.shoppingList = shoppingList;
          this.updateShoppingList();
      });

     //this.shopp

    }

  ngOnInit() {
  }

  updateShoppingList() {
  
    let tempShoppingList: Product[] = new Array<Product>();
   // this.productService.getProducts().subscribe(((products) => {

      // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.shoppingList.length; index++) {

        if ( this.appService.products.filter((item) => item.barcode === this.shoppingList[index].barcode).length > 0 ) {
        const product: Product = this.appService.products.filter((item) => item.barcode === this.shoppingList[index].barcode)[0];
        product.quantity = this.shoppingList.filter((item) => item.barcode === this.shoppingList[index].barcode)[0].quantity;
        tempShoppingList.push(product);
        } else {
          const product: Product = this.shoppingList[index];
         // product.name += ' brak';
          tempShoppingList.push(product);
        }
    }
    this.shoppingList = tempShoppingList;

   // }));
  }

  async clearShoppingList() {
    let alert = await this.alertController.create({
      //header: 'Confirm purchase',
      cssClass: 'myAlertAddProductToShoppingList',
      message: `<div>
                  <div class="center-in-alert">
                    <h5>
                      Potwierdzenie
                    </h5>
                    </br>
                  </div>
                  <div class="center-in-alert">
                    czy na pewno chcesz wyczyścić swoja listę zakupów?
                  </div>
                </div>`,
      buttons: [
        {
          text: 'anuluj',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'wyczyść',
          handler: () => {
            this.localDataService.clearShoppingList();
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
   
  }

  redirectToProducts() {
    this.router.navigate([ '/products' ] );
  }

}
