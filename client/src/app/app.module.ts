import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AuthService } from "./auth.service";

import { PageNotFoundComponent } from './ErrorPages/pageNotFound.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/Login/login.component';
import { HomeComponent } from "./Components/Home/home.component";
import { JoinTeamComponent } from "./Components/JoinTeam/joinTeam.component";

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
      RouterModule.forRoot(
          appRoutes,
          { enableTracing: true }
      ),

      FormsModule,
      ReactiveFormsModule,

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
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
