import { Component, OnInit } from '@angular/core';
import { InfoService } from '../services/info.service';
import { Info } from '../models/Info';
import * as firebase from 'firebase';
@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  path = ' ';
  grid: Array<Array<Info>> = [[]];
  // storage = firebase.storage();


  constructor(private infoService: InfoService) {

//haha


  }

  ngOnInit() {
    this.getInfos();
    
  }

  /*
  dissetImage(){
    
     
      document.getElementById('id').setAttribute('src','');
    
  }

  setImage(){
    const storageRef = this.storage.ref();
    

    storageRef.child('products/12345.jpg').getDownloadURL().then(function(url) {

     // document.getElementById("id").innerHTML="ahaha";
     
      document.getElementById('id').setAttribute('src',url);
     // this.path=url;
      //document.querySelector('img').src = test;
     // document.querySelector

        }).catch( function (error) {
          console.log(error);
        });
  }
  */

  getInfos() {
    this.infoService.getInfos().subscribe(((info) => {
      let rowNum = 0;
      for (let i = 0; i < info.length; i += 2) {
        this.grid[rowNum] = Array<Info>();
        if (info[i]) {
          this.grid[rowNum][0] = info[i];
        }
        if (info[i + 1]) {
          this.grid[rowNum][1] = info[i + 1];
        }
        rowNum++;
      }

   }));

  }

}
