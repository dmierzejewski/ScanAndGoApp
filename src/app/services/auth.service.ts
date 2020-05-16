import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/Storage';
@Injectable({
  providedIn: 'root'
})

export class AuthService {


  constructor( ) {
  }

  getUserName(): string {
    return firebase.auth().currentUser.email;
  }

  loginUser( email: string, password: string ): Promise<firebase.auth.UserCredential> {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
  }

  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }

  isLogged() {
    if (firebase.auth().currentUser) {
      return true;
    } else {
      return false;
    }
  }
}


/*

getUserName(): string {
    return 'xd';
    return firebase.auth().currentUser.uid;
  }
 logout() {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signOut().then(function() {
      console.log('wylogowano');
       
    }).catch(function(error) {
      console.log('error logowania');
    });
  }

login() {
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
  firebase.auth().getRedirectResult().then(function(result) {

  let user = result.user;
  this.userName = user.email;
  console.log(this.userName);

 

  }).catch(function(error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    // The email of the user's account used.
    let email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    let credential = error.credential;
    // ...
  });
}
*/