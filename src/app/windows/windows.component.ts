import { Component, OnInit } from '@angular/core';
import { FiredataService } from '../firedata.service';

@Component({
  selector: 'app-windows',
  templateUrl: './windows.component.html',
  styleUrls: ['./windows.component.scss'],
})
export class WindowsComponent implements OnInit {

  windows: Array<any>;
  constructor(private firebaseService: FiredataService) { }
  slideOpts = {
    initialSlide: 1,
    speed: 800
  };

  ngOnInit() {
    this.getWindows();
  }

  getWindows() {
    this.firebaseService.getWindows().subscribe(((test) => {
    this.windows = test; // .sort(this.compare); // .filter((task: Task) => task.name === 'f 31.60.228.28');
  }));
  }

}
