import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { ServiceWorkerModule } from '@angular/service-worker';
import * as firebase from 'firebase';
import { IonicStorageModule } from '@ionic/Storage';

// import { AuthenticationPage } from './authentication/authentication.page';
// import { AuthenticationPageModule } from './authentication/authentication.module';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { SetStyleDirective } from './set-style.directive';
import { StartPipe } from './start.pipe';
import { AccordionComponent } from './accordion/accordion.component';
import { BillsPage } from './bills/bills.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalPipe } from './modal.pipe';
import { ModalComponent } from './modal/modal.component';
// import { AuthGuardSearchService } from './services/auth-guard.service';
firebase.initializeApp(environment.firebase);

// firebase.auth().signInWithRedirect( new firebase.auth.GoogleAuthProvider() );

@NgModule({
  declarations: [
    AppComponent,
    SetStyleDirective,
    StartPipe,
    ModalPipe,
    // ModalComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    IonicStorageModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    Geolocation,
    // AuthGuardSearchService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Storage,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
