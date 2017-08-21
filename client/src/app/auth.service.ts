import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { environment } from "../environments/environment";

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";


@Injectable()
export class AuthService implements CanActivate {

    constructor(private afAuth: AngularFireAuth, private router: Router) { }

    getAuth(): any {
        return this.afAuth.auth;
    }

    getAuthState(): Observable<firebase.User> {
        return this.afAuth.authState;
    }

    logUserData() {
        this.getAuthState().subscribe(user => {
              if (!environment.production) {
                  console.log(user);
              }
        })
    }

    canActivate(): Observable<boolean> {
        return this.afAuth.authState
            .take(1)
            .map(authState => !!authState)
            .do(authenticated => {
                if (!authenticated) this.router.navigate(["/login"]);
            })
    }

    signOut() {
        this.getAuth().signOut();
        // After logout, send user to the login page
        this.router.navigate(["/login"]);
    }
}

