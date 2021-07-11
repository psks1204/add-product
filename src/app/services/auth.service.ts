import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Observable<any>;
  isLoggedIn: boolean = false;
  constructor(private afAuth: AngularFireAuth, private router: Router, private _snackBar: MatSnackBar) {

    this.user = afAuth.authState;
    this.user.subscribe(res=> {
      this.isLoggedIn = res ? true : false;
    })
    // if (this.isLoggedIn = true) {
    //   this.router.navigate(['/'])
    // }
  }

  login = (email: string, password: string) => {
    this.afAuth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        this.isLoggedIn = true;
        this.router.navigate(['/']);
        console.log(res);
      }
    ).catch((error)=> {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      this._snackBar.open(errorMessage);
      // ...
    });
    console.log(this.user);
  }

  signout() {
    this.afAuth.signOut().then((res) => {
      console.log(res);
      this.router.navigate(['/login']);
      // Sign-out successful.
    }).catch( (error) => {
      this._snackBar.open(error.message);
    });
  }
}
