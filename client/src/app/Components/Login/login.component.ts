import { Component } from '@angular/core';

import { AuthService } from "../../auth.service";

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    constructor(private authService: AuthService) { }

    doLogin(): void {
        this.authService.login();
    }

}
