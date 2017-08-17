import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { environment } from "../environments/environment";


@Injectable()
export class AuthService implements CanActivate {

    constructor(private router: Router) { }


    canActivate(): boolean {
        return true;
    }

    logUserData(): void {
        if (!environment.production) {
            console.log("User data: ");
        }
    }

    login() { }
}