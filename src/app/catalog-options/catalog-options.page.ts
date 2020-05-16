import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalog-options',
  templateUrl: './catalog-options.page.html',
  styleUrls: ['./catalog-options.page.scss'],
})
export class CatalogOptionsPage implements OnInit {

  doors = false;
  windows = false;

  constructor() { }

  ngOnInit() {
  }

  toggleDoors() {
    this.doors = !this.doors;
    if(this.doors){
      this.windows = false;
    }
  }

  toggleWindows() {
    this.windows = !this.windows;
    if(this.windows){
      this.doors = false;
    }
  }

}
