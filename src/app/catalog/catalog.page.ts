import { Component, OnInit } from '@angular/core';
import { FiredataService } from '../firedata.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit {

  doors: Array<any>;
  constructor(private firebaseService: FiredataService) { }
  slideOpts = {
    initialSlide: 1,
    speed: 800
  };

  ngOnInit() {
    this.getDoors();
  }
  getDoors() {
    this.firebaseService.getDoors().subscribe(((test) => {
    this.doors = test; // .sort(this.compare); // .filter((task: Task) => task.name === 'f 31.60.228.28');
  }));
  }

}
