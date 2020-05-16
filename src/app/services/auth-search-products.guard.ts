import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../services/app.service';

@Injectable({
  providedIn: 'root'
})

export class AuthSearchProductsGuard implements CanActivate {


  constructor(private router: Router, private appService: AppService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {

  if (this.appService.isSetMyShop) {
    resolve(true);
       
     } else {
      this.router.navigate([ '/my' ], { queryParams: { returnUrl: state.url } });
      resolve(false);
     }

    });
  }
  
}
