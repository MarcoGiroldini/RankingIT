import { Component, AfterViewInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "../../auth.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements AfterViewInit{

	constructor(private authService: AuthService, private router: Router) { }

    //Google SignIn init on the button
	ngAfterViewInit() {
        this.authService.googleInit('googleBtn');
    }

}
