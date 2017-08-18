import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { environment } from "../environments/environment";

import { AuthProvidersConfigs } from "../Configs/AuthConfigs";


declare const gapi: any;


@Injectable()
export class AuthService implements CanActivate  {

	constructor(private router: Router) { }

	public canActivate(): boolean {
		return true
    }

    /** Google SignIn setup */
    public auth2: any;

    public googleInit(elementId) {  //Button element specified when method is called
        gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
                client_id: AuthProvidersConfigs.GoogleClientId,
                cookiepolicy: 'single_host_origin',
                //scope: 'profile email'
                ux_mode: 'redirect',
                redirect_uri: (location.protocol + "//" + location.host + "/")
            });

            //Attaches onSignIn method
            gapi.signin2.render(elementId, {
                onsuccess: this.onSignIn()
            });
        });
    }

	public onSignIn(): void {
		console.log(gapi.auth2.getAuthInstance().currentUser.get());
	}

    public logUserData(): void {
		if (!environment.production) {
			console.log("User data: ");
        }
    }
}
