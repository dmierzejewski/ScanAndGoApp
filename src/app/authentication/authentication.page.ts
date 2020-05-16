import { Component, OnInit , ViewChild, Renderer, Directive} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import * as firebase from 'firebase/app';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})


export class AuthenticationPage implements OnInit {

  login = '';
  password = '';

  rlogin = '';
  rpassword = '';

  accordationReg = false;
  accordationLog = false;

  @ViewChild('reg', {static: true})
  reg: any;
  @ViewChild('regg', {static: true})
  regg: any;


  @ViewChild('log', {static: true})
  log: any;
  @ViewChild('logg', {static: true})
  logg: any;

  constructor(
    public alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private appService: AppService,
    private alertCtrl: AlertController,
  
    private renderer: Renderer
    ) {}

  ngOnInit() {
     this.config();
  }


  async logIn(temp?: boolean): Promise<void> {
    if (this.login === '' || this.password === '') {
      this.logInEmptyData();
    } else {

      this.authService.loginUser(this.login, this.password).then(
        () => {
            if (typeof temp === 'undefined') {
              this.logInSuccess();
              this.router.navigateByUrl(this.appService.redirect);
            }
           // this.router.navigateByUrl('scan');
           // this.authService.userName = firebase.auth().currentUser.email;
           
            this.login = '';
            this.password = '';
        },
        async error => {
          this.logInUnsuccess();
        }
      );


      
    }
  }

  async logInEmptyData() {
    const alert = await this.alertController.create({
      header: 'wprowadź dane logowania',
      buttons: ['OK']
    });

    await alert.present();
  }

  async logInSuccess() {
    const alert = await this.alertController.create({
      header: 'zalogowano poprawnie',
      buttons: ['OK']
    });
    await alert.present();
  }

  async logInUnsuccess() {
    const alert = await this.alertController.create({
      header: 'logowanie nieudane',
      buttons: ['OK']
    });
    this.password = '';
    await alert.present();
  }


  async signUpUser() {
    if (this.rlogin === '' || this.rpassword === '') {
      this.signUpEmptyData();
    } else {
      this.authService.signupUser(this.rlogin, this.rpassword)
      .then(res => {
        console.log(res);
        this.signUpSuccess();
      }, err => {
        console.log(err);
        this.signUpUnsuccess(err.message);
      });
    }
  }

  async signUpEmptyData() {
    const alert = await this.alertController.create({
      header: 'wprowadź dane rejestracji',
      buttons: ['OK']
    });
    await alert.present();
  }

  async signUpSuccess() {
    const alert = await this.alertController.create({
      header: 'zarejestrowano poprawnie',
      buttons: [ {
        text: 'OK',
        handler: () => {
          this.login = this.rlogin;
          this.password = this.rpassword;
          this.logIn(true);
          this.rlogin = '';
          this.rpassword = '';
        }
      }]
    });
    await alert.present();
  }

  async signUpUnsuccess(msg: string) {
    const alert = await this.alertController.create({
      header: 'rejestracja nieudana',
      message: msg,
      buttons: ['OK']
    });
    this.password = '';
    await alert.present();
  }


  preview() {
    this.router.navigateByUrl('products');
  }


  toggleAccordationReg() {
    if ( this.accordationLog ) {
      this.renderer.setElementStyle( this.log.nativeElement, 'max-height', '0px' );
      this.renderer.setElementStyle( this.log.nativeElement, 'padding', '0px 128px' );
      this.accordationLog = false;
    }

    this.renderer.setElementStyle( this.logg.nativeElement, 'visibility', 'hidden' );
    this.renderer.setElementStyle( this.regg.nativeElement, 'visibility', 'visible' );

    if (this.accordationReg) {
      this.renderer.setElementStyle( this.reg.nativeElement, 'max-height', '0px' );
      this.renderer.setElementStyle( this.reg.nativeElement, 'padding', '0px 128px' );
    } else {
      this.renderer.setElementStyle( this.reg.nativeElement, 'max-height', '200px' );
      this.renderer.setElementStyle( this.reg.nativeElement, 'padding', '16px 0px' );
    }

    this.accordationReg = !this.accordationReg;
  }

  toggleAccordationLog() {

    if ( this.accordationReg ) {
      this.renderer.setElementStyle( this.reg.nativeElement, 'max-height', '0px' );
      this.renderer.setElementStyle( this.reg.nativeElement, 'padding', '0px 128px' );
      this.accordationReg = false;
    }

    this.renderer.setElementStyle( this.regg.nativeElement, 'visibility', 'hidden' );
    this.renderer.setElementStyle( this.logg.nativeElement, 'visibility', 'visible' );

    if (this.accordationLog) {
      this.renderer.setElementStyle( this.log.nativeElement, 'max-height', '0px' );
      this.renderer.setElementStyle( this.log.nativeElement, 'padding', '0px 128px' );
    } else {
      this.renderer.setElementStyle( this.log.nativeElement, 'max-height', '200px' );
      this.renderer.setElementStyle( this.log.nativeElement, 'padding', '16px 0px' );
    }

    this.accordationLog = !this.accordationLog;
  }

  config() {
    this.renderer.setElementStyle(this.reg.nativeElement, 'webkitTransition', 'max-height 500ms, padding 500ms' );
    this.renderer.setElementStyle(this.log.nativeElement, 'webkitTransition', 'max-height 500ms, padding 500ms' );
    this.renderer.setElementStyle(this.regg.nativeElement, 'webkitTransition', 'visibility 500ms' );
    this.renderer.setElementStyle(this.logg.nativeElement, 'webkitTransition', 'vivibility 500ms' );
  }




}
