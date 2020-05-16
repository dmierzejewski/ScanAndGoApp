import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { AppService } from '../services/app.service';
import { GoogleMaps, GoogleMap} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Shop } from '../models/Shop';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-my',
  templateUrl: './my.page.html',
  styleUrls: ['./my.page.scss'],
})
export class MyPage implements OnInit {

  // nowy AIzaSyAsmcSMt5cId1KmAch3P-FsngpIYtZ6tfI
  // stary AIzaSyDET07yZBP6x3hgvtyZ_PXyoQ8nk1qwvRA
  // map: GoogleMap;
  // loading: any;
  shops: Array<any> = new Array<any>();

  // distance;

 customAlertOptions: any = {
    header: 'Sklepy w twojej okolicy:',
    // subHeader: 'Select your toppings',
    // message: '$1.00 per topping',
    translucent: true,
  };

  constructor(private productService: ProductService,
              // private geolocation: Geolocation,
              private router: Router,
              public authService: AuthService,
              public appService: AppService) {

                // XD
              }

  ngOnInit() {
    this.getData();
  }

  async logOut() {
    this.appService.redirect = 'my';
    await this.router.navigateByUrl('my');
    this.authService.logoutUser();
  }

  click() {
    console.log('click');
  }
  redirectToLogin() {
    this.appService.redirect = 'my';
    this.router.navigate([ '/authentication' ] );
  }
  isLogged() {
    return this.authService.isLogged();
   }
   getUserName(): string {
    return this.authService.getUserName();
  }
 
  getDistance(coord): number {
    const R = 6371e3; // metres
    const lat2 = parseFloat(coord.split(',')[0]);
    const lon2 = parseFloat(coord.split(',')[1]);

    const φ1 = this.appService.lat * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - this.appService.lat) * Math.PI / 180;
    const Δλ = (lon2 - this.appService.lon) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = parseFloat((R * c / 1000.0).toFixed(2));

    return d;
  }
  compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.distance;
    const bandB = b.distance;
  
    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }
  getData() {
    this.productService.getShops().subscribe(((value) => {
    this.shops = value;
    this.shops.forEach((item: Shop) => item.distance = this.getDistance(item.localization));
    this.shops.sort(this.compare);
  }));
  }

}

/*


getLocation() {
      this.appService.watch.subscribe((data) => {
        this.lat = data.coords.latitude;
        this.lon = data.coords.longitude;
        console.log(data.coords.longitude);
      });
  }




getLocation(){
      // this.appService.getLocation();
      this.appService.watch.subscribe((data) => {
        // data can be a set of coordinates, or an error (if an error occurred).
        this.lat =  data.coords.latitude;
  
        this.lon = data.coords.longitude;
  
  
        var d;
        this.geolocation.getCurrentPosition().then((resp) => {
          //console.log('my lat: ' + resp.coords.latitude);
          //console.log('my lon: ' + resp.coords.longitude);
          //console.log(resp.coords)
          var R = 6371e3; // metres
          let lat1 = resp.coords.latitude;
          
          let lat2=parseFloat(this.appService.myShop.localization.split(',')[0]);
          let lon1=resp.coords.longitude;
          let lon2=parseFloat(this.appService.myShop.localization.split(',')[1]);
         
          console.log(lat1, lat2, lon1, lon2);
         
    
          var φ1 = lat1 * Math.PI / 180;
          var φ2 = lat2 * Math.PI / 180;
          var Δφ = (lat2 - lat1) * Math.PI / 180;
          var Δλ = (lon2 - lon1) * Math.PI / 180;
          var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    d = R * c;
    this.distance=d/1000.0;
    //this.distance = d;
   // console.log(d);
    
    
         }).catch((error) => {
           console.log('Error getting location', error);
         });
    
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
        
       });
  }

loadMap() {
   // await this.loadMap();
   
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 43.0741704,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    });
  
  }
*/
