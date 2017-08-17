import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { environment } from "../environments/environment";

declare const gapi: any;


@Injectable()
export class AuthService implements CanActivate  {

  constructor(private router: Router) { }

  public canActivate(): boolean {
    return true;
  }

  /** Google SignIn setup and  */
  public auth2: any;

  public googleInit(element) {  //Button element specified when method is called
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '123106317142-9iftdo73fihmoh472cce4qh2fhe8rg37.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        //scope: 'profile email'
        //ux_mode: 'redirect',
        //redirect_uri: '/'
      });
      this.attachSignin(element);
    });

  }

  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE


      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  public logUserData(): void {
    if (!environment.production) {
      console.log("User data: ");
    }
  }
}
