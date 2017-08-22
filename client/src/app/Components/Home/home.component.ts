import { Component } from '@angular/core';
import { Router } from "@angular/router";

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
			this.httpService.post(this.httpService.getApiServerUrl() + "api/login", {
				// TODO: Object to send
			}).subscribe(
				data => {
					console.log(data);
				},
				err => {
					console.error(err);
				}
			);
		})
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
