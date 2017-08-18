import { Component, AfterViewInit } from '@angular/core';

import { AuthService } from "../../auth.service";
//import { AppSettings } from '../../app.component'; //Global vars

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements AfterViewInit{

  constructor(private authService: AuthService) { }

  //Google SignIn init on the button
  ngAfterViewInit(){
    this.authService.googleInit(document.getElementById('googleBtn'), 'googleBtn');
  }

}
