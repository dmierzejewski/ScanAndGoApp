import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {


  constructor(private router: Router,  private appService: AppService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user: firebase.User) => {
        if (user) {
        resolve(true);
        } else {

          let temp = this.appService.redirect;
          console.log('odmowa z ' +  this.appService.redirect + ' ' + state.url);
          this.appService.redirect = state.url;
          if (temp !== 'my'){
            this.router.navigate([ '/authentication' ], { queryParams: { returnUrl: state.url } });
          }
         
          resolve(false);
        }
      });
    });
  }


}










/*



async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
}

getLocal() {
    this.storage.get('logged').then((output) => {
      console.log('w funkcji ' + output);
      if (output) {
      return true;
      } else {
        return false;
      }
  });
}
















    if ( this.authInfo.authenticated ) {
      console.log('autoryzowany wprost');
      this.storage.set('logged', true);
      return true;
    }
    if ( this.local.authenticated ) {
      console.log('autoryzowany wprost z locala');
      return true;
    }

    if (!this.authInfo.authenticated) {


        let temp = this.getLocal();
        console.log('xd ' + temp );

        if ( true ) {
          console.log('na krótko');
          return true;
        }


        console.log('odrzucony wprost');
        this.router.navigate(['authentication']);
        return false;
    }

    this.router.navigate(['authentication']);
    return false;



    this.delay(2000).then( any => {
    if (!this.authInfo.authenticated) {


        if (this.local.authenticated) {
          console.log('autoryzowany po czasie z locala');
          return true;
        } else {
          console.log('odrzucony po czasie z locala');
          this.router.navigate(['authentication']);
          return false;
        }

      }
    });

*/

 
/*


 // tslint:disable-next-line: only-arrow-functions
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        return true;
      } else {
        this.router.navigate(['authentication']);
        return false;
        // No user is signed in.
      }
    });










      this.storage.get('logged').then(async (val) => {
        if (val) {
          
          this.authInfo.authenticated = true;
          console.log('na localu true:' + this.authInfo.authenticated);
          return await true;
        } else {
          this.authInfo.authenticated = false;
          console.log('na localu false:' + this.authInfo.authenticated);
          this.router.navigate(['authentication']);
          return this.authInfo.authenticated;
        }
    });

 if (this.val) {
        this.authInfo.authenticated = true;
        console.log('na localu :' + this.authInfo.authenticated);
        return true;
      } else {
        this.authInfo.authenticated = false;
        console.log('na localu :' + this.authInfo.authenticated);
        this.router.navigate(['authentication']);
        return false;
      }





*/

 /*
 canActivate(route: ActivatedRouteSnapshot): boolean {
    // this.local.authenticationState.next(true);
    //console.log(this.local.isAuthenticated());
    //return this.local.isAuthenticated();
    console.log('poszło true');
    return true;
  }
 */