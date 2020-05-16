import { Component, OnInit } from '@angular/core';
import { FiredataService } from '../firedata.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/Storage';
@Component({
  selector: 'app-new-todos',
  templateUrl: './new-todos.page.html',
  styleUrls: ['./new-todos.page.scss'],
})
export class NewTodosPage implements OnInit {

  public folder: string;
  infos: Array<any>;

  constructor(private storage: Storage, private firebaseService: FiredataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
   
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.getInfos();
  }

  getInfos() {
    this.firebaseService.getInfos().subscribe(((test) => {
    this.infos = test; // .sort(this.compare); // .filter((task: Task) => task.name === 'f 31.60.228.28');
  }));

}

}
