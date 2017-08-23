import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseUIModule, FirebaseUIAuthConfig, AuthProvider, AuthMethods, AuthProviderWithCustomConfig } from "firebaseui-angular";
import { FirebaseUi } from "../Configs/FirebaseAuthProviders";
import { AuthService } from "./auth.service";
import { HttpService } from "./Services/http.service";

import * as FirebaseConfigs from "../Configs/Firebase.json";

import {
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdIconModule,
    MdSidenavModule,
    MdAutocompleteModule,
    MdInputModule,
    MdOptionModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { environment } from "../environments/environment";
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/Login/login.component';
import { HomeComponent } from "./Components/Home/home.component";
import { PageNotFoundComponent } from './ErrorPages/pageNotFound.component';
import { JoinTeamComponent } from "./Components/JoinTeam/joinTeam.component";


const appRoutes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "",
        component: HomeComponent,
        canActivate: [AuthService],
        children: [
            {
                path: "joinTeam",
                component: JoinTeamComponent
            }
        ]
    },
    {
        path: "**",
        component: PageNotFoundComponent
    }
];



@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        PageNotFoundComponent,
        HomeComponent,
        JoinTeamComponent
    ],
    imports: [
		BrowserModule,
		AngularFireModule.initializeApp(FirebaseConfigs),
        AngularFireAuthModule,
		FirebaseUIModule.forRoot(FirebaseUi.AuthConfig),
        RouterModule.forRoot(
			    appRoutes,
			    { enableTracing: !environment.production }
        ),
        FormsModule,
		ReactiveFormsModule,
		HttpModule,

        BrowserAnimationsModule,
        MdCheckboxModule,
        MdButtonModule,
        MdToolbarModule,
        MdIconModule,
        MdSidenavModule,
        MdAutocompleteModule,
        MdInputModule,
        MdOptionModule
    ],
	providers: [
		AuthService,
		HttpService
	],
    bootstrap: [AppComponent]
})
export class AppModule { }
