import { Component } from '@angular/core';
import { Router } from "@angular/router";

import { Observable } from "rxjs/Observable";
import * as firebase from "firebase/app";
import { AuthService } from "../../auth.service";
import { AngularFireDatabase } from "angularfire2/database";

import { environment } from "../../../environments/environment";

@Component({
    selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ["./login.component.css"]
})
export class LoginComponent {
    user: Observable<firebase.User> = null;

    constructor(private authService: AuthService, private router: Router, private af: AngularFireDatabase) {
        this.user = authService.getAuthState();
    }

    ngOnInit(): void {
        this.user.subscribe(d => {
            // If user is logged and he has returned to this page, send him to the main path
            if (d) {
                this.router.navigate(["/"]);
            };
        });
    }
}
