import { Injectable } from '@angular/core';
import { Shop } from '../models/Shop';
import { AngularFirestore } from 'angularfire2/firestore';
import { Storage } from '@ionic/Storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocalDataService } from '../services/local-data.service';
import { ProductService } from './product.service';
import { Product } from '../models/Product';
import * as firebase from 'firebase';
import { BillService } from './bill.service';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  monthSum = new Array(12).fill(0);
  myBills: Array<any> = new Array<any>();
  myProducts: Array<any> = new Array<any>();
  sum = 0;
  myShop: Shop = {id: 'id', name: 'name', localization: 'localization', shopCode: 'shopCode', address: 'address'};
  isSetMyShop = false;
  distance = 0;
  lat;
  lon;
  products: Product[] = new Array<Product>();
  redirect = '/my';
  // storage = firebase.storage();
  // localDataService: any;

  constructor(public db: AngularFirestore,
              private billService: BillService,
              private geolocation: Geolocation,
              // private localDataService: LocalDataService,
              // private productService: ProductService,
              private storage: Storage) {

          this.storage.get('myShop').then((val) => {

              if (val !== null) {
                  this.myShop = val;
                  this.isSetMyShop = true;
                  this.changeProducts();
              }
          });

          this.geolocation.getCurrentPosition().then((resp) => {
            this.lat =  resp.coords.latitude;
            this.lon =  resp.coords.longitude;
           }).catch((error) => {
             console.log('Error getting location', error);
           });
          // this.configureBills();

   }

  // watch = this.geolocation.watchPosition();

  changeProducts() {
    this.set().then(result => {
      this.products = result;
      // console.log(this.products);
    });
   }

  set() {
      // tslint:disable-next-line: prefer-const
      let dbdb  = firebase.firestore();
      return dbdb.collection('/shops/' + this.myShop.id + '/products').get().then(function(querySnapshot) {
        // tslint:disable-next-line: prefer-const
        let prod = []; // = new Array<Product>();
        querySnapshot.forEach( function(doc) {

             const data = doc.data() as Product;
             const id = doc.id;

             let product: Product = new Product();
             product =  { id, ...data } as Product;

             product.image =
              'https://firebasestorage.googleapis.com/v0/b/scanandgo-pwsa-6148c.appspot.com/o/products%2F'
               + product.barcode
               + '.jpg?alt=media';

             prod.push(product);

         });
        return prod;
     });
     }


  isInMyShop(id: string): boolean {
       if ( this.products.filter((item) => item.id === id).length > 0) {
          return true;
       }

       return false;
  }

  isInPromo(id: string): boolean {

      // tslint:disable-next-line: curly
      if (
            this.products.filter((item) => item.id === id)[0].discount > 0
         && this.products.filter((item) => item.id === id)[0].promoStart < this.getTime()
         && this.products.filter((item) => item.id === id)[0].promoEnd > this.getTime()
      ) {
      return true;
      } else {
        return false;
      }
 }

  getPriceForHTML(id: string): string {

      // return 0.01;
      if (this.isInPromo(this.products.filter((item) => item.id === id)[0].id)){
      let promoPrice;
      promoPrice = this.products.filter((item) => item.id === id)[0].price;
      promoPrice *= (1 - this.products.filter((item) => item.id === id)[0].discount);
      promoPrice = (Math.round(promoPrice * 100) / 100).toFixed(2);
      return  '<span class="old">' +  this.products.filter((item) => item.id === id)[0].price.toString()  + 'zł' + '</span>' +
      '        <span class="new">' +  promoPrice.toString() + 'zł' + '</span>';
      } else {
        return  '<span>' +  this.products.filter((item) => item.id === id)[0].price.toString() + 'zł' + '</span>';
      }
    }


  getPromoPrice(id: string): number {

      let promoPrice;
      promoPrice = this.products.filter((item) => item.id === id)[0].price;
      promoPrice *= (1 - this.products.filter((item) => item.id === id)[0].discount);
      promoPrice = (Math.round(promoPrice * 100) / 100).toFixed(2);
      return promoPrice;

  }

  setMyShop(newShop: string) {
    this.db.collection('shops').doc(newShop).ref.get().then((doc) => {
      if (doc.exists) {

        this.myShop = doc.data() as Shop;
        this.myShop.id = doc.id;
        this.storage.set('myShop', this.myShop);
        this.isSetMyShop = true;
        this.changeProducts();

      } else {
        console.log('No such document!');
        }
      }).catch((error) => {
        console.log('Error getting document:', error);
      });
  }
/*
  async configureBills(){
    this.myBills = await (await this.billService.getBillsFromService()).sort(this.compare);
    console.log('xd');
    console.log(this.myBills);
    this.myBills.forEach( (bill) => {

      let month = bill.date.substr(5, 2);
      this.monthSum[month - 0] += bill.price;
      console.log(month);
     // if (bill.date > '2020.05.10') {
        // this.monthSum.push(bill);
     // }
    } 
   
    );
  }
*/
 



  getTime(): string {

    const YYYY = new Date().getFullYear().toString();
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


}
