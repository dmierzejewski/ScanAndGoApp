import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Bill } from '../models/Bill';
import { Product } from '../models/Product';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class BillService {
  dbdb  = firebase.firestore();
  // messages: string[] = [];
  // mess;
  // myBillsS = ['a', 'b', 'c'];
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
  constructor(public db: AngularFirestore,
              public authService: AuthService) {

  // this.test();
    
   
    /*
     var docRef = this.dbdb.collection('bills').doc('87OCKOYXttM8mAWVdkye');

    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    */

  }

  async getBillsFromService() {
    const snapshot = await firebase.firestore().collection('bills')
    .where('email', '==', this.authService.getUserName()).get();
    return snapshot.docs.map(doc => doc.data());
}


 /* getBills(email: string) {
    console.log(email);
    return this.db.collection<Bill>('/bills', ref => ref.where('email', '==', email))
    .snapshotChanges()
    .pipe(
        map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data() as Bill;
            const id = a.payload.doc.id;
            return { id, ...data };
        });
        })
    );
  }*/

  addBill(value) {
    this.db.collection('/bills').add(value);
    // console.log(this.myBillsS);
  }

}


/*

test(){
    this.dbdb.collection('bills').where('email', '==', this.authService.getUserName())
    .get()
    .then(function(querySnapshot) {
      //this.myBillsS = querySnapshot;
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            //this.myBillsS.push(doc.data());
            //this.messages.push(doc.id.toString());
            this.mess=doc.id;
        });
        //console.log(this.myBillsS);
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }

  testAddBill() {


    //this.db.collection('/bills/mojeID/paragon1').add(this.temp);
    // this.db.collection('/bills/mojeID/paragon1').add(this.temp);
    // this.db.collection('/bills').doc('mojeID').set({
     // date: 'maj',
     // price: 12.99
    // });
    // this.db.collection('/bills/mojeID/paragon2').add(this.temp);
    // this.db.collection('/bills').doc('ID').collection().add(this.temp)
    // this.db.collection('/bills/uuuID').
  }
  
  */


