import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../models/Product';
import { map } from 'rxjs/operators';
import { Infos } from '../models/Infos';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppService } from './app.service';
import { Shop } from '../models/Shop';
import { Storage } from '@ionic/Storage';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})

export class ProductService {

  infos: Infos;

  temp: Product = {
    name: 'Dawtona 0.33L'
  , barcode: '666'
  , price: 1.0
  , quantity: 1000
  , image: 'https://apimarket.pl/501174-thickbox_default/dawtona-sok-pomidorowy-330-ml.jpg'
  , discount: 0.2
  , promoStart: '2020.05.06 06:00:00'
  , promoEnd: '2020.05.12 21:00:00'
  , category: 'napoje / wody'
  };

  infosObs = new BehaviorSubject<Infos>({name: 'name', localization: 'localization', address: 'address', shopCode: 'code'});

  sum: number;

  constructor(public db: AngularFirestore,
              private storage: Storage,
              private appService: AppService) {

                if (this.appService.isSetMyShop) {
     // console.log('/shops/' + this.appService.myShop.id + '/products');
     // this.db.collection('/shops/' + this.appService.myShop.id + '/products').add(this.temp);
     // this.db.collection('/shops/SKLEP#3/products').add(this.temp);

     //this.config();

   }

  }


  getInfos(): Observable<Infos> {
    return this.infosObs.asObservable();
  }


  getProducts() {

    return this.db.collection<Product>('/shops/' + this.appService.myShop.id + '/products')
    .snapshotChanges()
    .pipe(
        map(actions => {
          return actions.map(a => {
              const data = a.payload.doc.data() as Product;
              const id = a.payload.doc.id;
              return { id, ...data };
          });
        })
    );
  }

  getShops() {
    return this.db.collection<Shop>('/shops')
    .snapshotChanges()
    .pipe(
        map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data() as Shop;
            const id = a.payload.doc.id;
            return { id, ...data };
        });
        })
    );
  }

}


/*
  getInfosData() {

    this.db.collection('shops').doc(this.appService.myShop).ref.get().then((doc) => {
    if (doc.exists) {
        this.infos = doc.data() as Infos;
        this.infosObs.next(this.infos);
    } else {
      console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });
  }

*/

  /*
getShopsData() {

    this.db.collection('shops').doc(this.appService.myShop).ref.get().then((doc) => {
    if (doc.exists) {
        this.infos = doc.data() as Infos;
        this.infosObs.next(this.infos);
    } else {
      console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });
  }
  */





/*
config(){

  this.set().then(result => {
    this.products = result;
    // this.productsObs.next(this.products);
    console.log(this.products);
  });
 }
   set() {
    // tslint:disable-next-line: prefer-const
    var dbdb  = firebase.firestore();
    return dbdb.collection('/shops/' + this.appService.myShop.id + '/products').get().then(function(querySnapshot) {

      // tslint:disable-next-line: prefer-const
      var prod = []; // = new Array<Product>();
      querySnapshot.forEach( function (doc) {

           const data = doc.data() as Product;
           const id = doc.id;

           let product: Product = new Product();
           product =  { id, ...data } as Product;

           prod.push(product);
       });
      return prod;
      // this.products = new Array<Product>();
      // this.products = prod;
      // console.log('cała');
      // console.log(prod);
   });
   }

 */

/*
getInfos() {

this.db.collection('shops').doc(this.myShop).ref.get().then((doc) => {
     if (doc.exists) {
       console.log('Document data:', doc.data() as Infos);
       return doc.data() as Infos;
     }
     else {
       console.log('No such document!');
     }
   }).catch((error) => {
     console.log('Error getting document:', error);
   });
  

}

getInfos() {
  return this.db.collection<Infos>('/shops').doc(this.myShop).collection('infos')
  .snapshotChanges()
  .pipe(
      map(actions => {
      return actions.map(a => {
          const data = a.payload.doc.data() as Infos;
          // console.log()
          // console.log(data);
          const id = a.payload.doc.id;
          return { id, ...data };
      });
      })
  );
}

 searchProducts(name: string) {
    return this.db.collection<Product>('/shops/' + this.myShop + '/products', ref => ref.where('name', '==', name))
    .snapshotChanges()
    .pipe(
        map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data() as Product;
            const id = a.payload.doc.id;
            return { id, ...data };
        });
        })
    );
  }
*/

