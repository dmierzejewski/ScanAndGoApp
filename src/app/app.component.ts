import { Component, OnInit } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
//import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Storage } from '@ionic/Storage';
import * as firebase from 'firebase';
import { AppService } from './services/app.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit {
  public selectedIndex = 0;
  rootPage: 'orders';

  public appPages = [
    {
      title: 'Informacje',
      url: '/start',
      icon: 'info2.png'
    },
    /*
    {
      title: 'Products',
      url: '/catalog-options',
      icon: 'mail'
    },


 {
      title: 'Zamówienia',
      url: '/orders',
      icon: 'mail'
    },

    */

    {
      title: 'Produkty',
      url: '/products',
      icon: 'product.png'
    },
    {
      title: 'Zakupy',
      url: '/scan',
      icon: 'shop.png'
    },
    {
      title: 'Transakcje',
      url: '/bills',
      icon: 'buy.png'
    },
    {
      title: 'Szukaj',
      url: '/search',
      icon: 'search.png'
    },
    {
      title: 'Lista zakupów',
      url: '/shopping-list',
      icon: 'lists.png'
    },
    // {
    //  title: 'Autoryzacja',
    //  url: '/authentication',
    //  icon: 'login.png'
    // },
    {
      title: 'Konto',
      url: '/my',
      icon: 'account.png'
    },
  ];

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private appService: AppService,
    private platform: Platform,
    // private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authService: AuthService,
    private storage: Storage, //ma być
    private menu: MenuController,
    private splashScreen: SplashScreen,
    private router: Router
  ) {
    this.splashScreen.show();
    this.initializeApp();
  }

  initializeApp() {
      this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // this.splashScreen.show();
      this.menu.open();
      this.router.navigateByUrl('/start');
    });
  }

  ngOnInit() {
    // const path = window.location.pathname.split('orders/')[1];
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  /*
  logOut() {
    this.authService.logoutUser();
  }

  getUserName(): string {
    return this.authService.getUserName();
  }

  isLogged() {
   return this.authService.isLogged();
  }
  */

}
