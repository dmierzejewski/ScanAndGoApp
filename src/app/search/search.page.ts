import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/Product';
import { LocalDataService } from '../services/local-data.service';
import { AppService } from '../services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})

export class SearchPage implements OnInit {

  query: string;
  // products: Array<any> = new Array<any>();
  // products: Array<any> = [];
  products: Product[] = [];
  slideOpts = {
    initialSlide: 0,
    speed: 1600
  };
  constructor(private productService: ProductService,
              public localDataService: LocalDataService,
              public appService: AppService,
              private router: Router) {
      // if (!appService.isSetMyShop) {
        // this.router.navigate([ '/my' ]);
     // }
     // localDataService.getShoppingList();
    }



  ngOnInit() {
     // if (!this.appService.isSetMyShop) {
      //   this.router.navigate([ '/my' ]);
    //  }
  }

  searchProducts() {
    if (this.query.length >= 2) {
      this.products = this.appService.products.filter((product: Product) => product.name.toLowerCase().includes(this.query.toLowerCase()));
      //this.productService.getProducts().subscribe(((products) => {
        //this.products = products.filter((product: Product) => product.name.toLowerCase().includes(this.query.toLowerCase()));
     // }));
    } else {
      // this.products = new Array<any>();
      this.products = [];
    }
  }

  changeInput() {
     this.searchProducts();
  }

}
