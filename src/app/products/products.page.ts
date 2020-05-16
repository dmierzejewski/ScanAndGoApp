import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { LocalDataService } from '../services/local-data.service';
import { Infos } from '../models/Infos';
import { AppService } from '../services/app.service';
// import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  // products: Array<any> = new Array<any>();
  promo = false;
  BUTTON_TEXT_SEE_PROMOS = 'zobacz promocje';
  BUTTON_TEXT_SEE_ALL_PRODUCTS = 'zobacz wszystkie produkty';
  buttonText = this.BUTTON_TEXT_SEE_PROMOS;

  slideOpts = {
    initialSlide: 0,
    speed: 1000
  };
  ITER = 2;
  iter = this.ITER;
  first = true;

  constructor(
              public appService: AppService,
              // private productService: ProductService,
              public localDataService: LocalDataService
    ) {
     }

  ngOnInit() {
    // this.getProductsFromDataBase();
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
  async slidesDidLoad(slides) {
    this.first = false;
    await this.delay(1000);
    slides.slideNext();
    console.log('before delay');
    await this.delay(2000);
    slides.slidePrev();
    console.log('after delay');
  }


  increment() {
    this.iter = this.iter + 1;
  }

  seePromoProducts() {
   
    if (this.promo) {
      this.buttonText = this.BUTTON_TEXT_SEE_PROMOS;
    } else {
      this.buttonText = this.BUTTON_TEXT_SEE_ALL_PRODUCTS;
    }
    this.promo = !this.promo;
    this.iter = this.ITER;
  }

  getProducts(): Array<any> {
    if ( !this.promo ) {
    return this.appService.products.slice(0, this.iter);
    } else {
      return this.appService.products.filter((item) => this.appService.isInPromo(item.id)).slice(0, this.iter);
    }
  }

  getValue(): string {

    if ( !this.promo ) {
          if ( this.iter >= this.appService.products.length ) {
            return null;
          } else {
            return 'więcej produktów...';
          }
    } else {
          if (this.appService.products.filter((item) => this.appService.isInPromo(item.id)).length > this.iter) {
            return 'więcej produktów...';
          } else {
              return null;
          }
      }


  }

  getInfo(): string {

    if (this.getProducts().length === 0) {
      return 'brak produktów';
    }
  }








/*


 //getProductsFromDataBase() {

    
   // this.productService.getProducts().subscribe(((products) => {
    //this.products = products; // .sort(this.compare); // .filter((task: Task) => task.name === 'f 31.60.228.28');
  //}));

  //}

  getPromoPrice(id: string): number {

    return 0.01;
    let promoPrice;
    promoPrice = this.products.filter((item) => item.id === id)[0].price;
    promoPrice *= (1 - this.products.filter((item) => item.id === id)[0].discount);
    promoPrice = (Math.round(promoPrice * 100) / 100).toFixed(2);
    return promoPrice;
  }
  
  isInPromo(id: string): boolean {

    //return true;
    // tslint:disable-next-line: curly
    if (
          this.products.filter((item) => item.id === id)[0].discount > 0
       && this.products.filter((item) => item.id === id)[0].promoStart < this.appService.getTime()
       && this.products.filter((item) => item.id === id)[0].promoEnd > this.appService.getTime()
    ) {
    return true;
    } else {
      return false;
    }
  }
  */

}
