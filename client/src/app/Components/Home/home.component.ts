import { Component } from '@angular/core';
import { Router } from "@angular/router";

import { Observable } from "rxjs/Observable";
import { AuthService } from "../../auth.service";


@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: [ 'home.component.css']
})
export class HomeComponent {

    constructor(private router: Router) {
        
    }

    ngOnInit() {
        
    }

    doLogout() {
        // TODO
    }

    returnToHomePath() {
        this.router.navigate(["/"]);
    }
}
