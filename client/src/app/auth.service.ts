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

  public googleInit(element, elementId) {  //Button element specified when method is called
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '123106317142-9iftdo73fihmoh472cce4qh2fhe8rg37.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        //scope: 'profile email'
        ux_mode: 'redirect',
        redirect_uri: 'http://localhost:4200/login'
      });

      //Attaches onSignIn method
      gapi.signin2.render(elementId, {
        onsuccess: this.onSignIn
      });
    });
  }

  public onSignIn(){
    console.log(gapi.auth2.getAuthInstance().currentUser.get());
    //Code here
  }

  public logUserData(): void {
    if (!environment.production) {
      console.log("User data: ");
    }
  }
}
