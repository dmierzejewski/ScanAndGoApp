import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Info } from '../models/Info';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(public db: AngularFirestore) { }

  getInfos() {
    return this.db.collection<Info>('/infos')
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
}
