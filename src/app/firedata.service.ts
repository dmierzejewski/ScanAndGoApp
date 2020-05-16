import { Injectable } from '@angular/core';
import { Info } from './models/Info';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Doors } from './models/Doors';
import { Windows } from './models/Windows';

@Injectable({
  providedIn: 'root'
})
export class FiredataService {

  public start = false;
  path = '/infos';

  constructor( public db: AngularFirestore ) { }

  public killOrder() {
    //console.log('killer');
    this.start = false;
  }

  generateOrder(value) {
    
  
    this.db.collection('/orders').add(value);

   

  }

  getInfos() {
    return this.db.collection<Info>(this.path)
    .snapshotChanges()
    .pipe(
        map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data() as Info;
            const id = a.payload.doc.id;
            return { id, ...data };
        });
        })
    );

  }

  getDoors() {
    return this.db.collection<Doors>('/catalog/doors/all')
    .snapshotChanges()
    .pipe(
        map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data() as Doors;
            const id = a.payload.doc.id;
            return { id, ...data };
        });
        })
    );
  }

  getWindows() {
    return this.db.collection<Windows>('/catalog/windows/all')
    .snapshotChanges()
    .pipe(
        map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data() as Windows;
            const id = a.payload.doc.id;
            return { id, ...data };
        });
        })
    );
  }


}
