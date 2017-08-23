import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { HttpErrorResponse } from '@angular/common/http';

import { environment } from "../../../environments/environment";

import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { AuthService } from "../../auth.service";
import { HttpService } from "../../Services/http.service";


@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: [ 'home.component.css']
})
export class HomeComponent {

    user: Observable<firebase.User> = null;

	constructor(private authService: AuthService, private router: Router, private httpService: HttpService) {
		this.user = authService.getAuthState();

		this.user.subscribe(userData => {

			// Get token
			userData.getIdToken().then(token => {

				if (!environment.production) {
					console.log("Token: ", token);
				}

				// Send it to the api to login user
				this.httpService.post(this.httpService.getApiServerUrl() + "api/auth/login", {
					token: token
				}).subscribe(
					data => {
						//console.log(data);
					},
					(err: HttpErrorResponse) => {
						if (err.status == 401) {
							alert("It seems you are not logged... Redirecting to login");
							this.router.navigate(["/login"]);
						} else {
							console.error(err);
						}
					}
				);
			});
		});
    }

    ngOnInit() {
        this.authService.logUserData();
    }

    doLogout() {
        this.authService.signOut();
    }

    returnToHomePath() {
        this.router.navigate(["/"]);
    }
}
