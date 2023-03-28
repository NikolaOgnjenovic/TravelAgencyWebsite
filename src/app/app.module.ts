import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EditDestinationComponent } from './edit-destination/edit-destination.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AgencyNotFoundComponent } from './agency-not-found/agency-not-found.component';
import { DestinationComponent } from './destination/destination.component';
import { EditAgencyComponent } from './edit-agency/edit-agency.component';
import { DestinationsComponent } from './destinations/destinations.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DestinationComponent,
    EditUserComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    AgencyNotFoundComponent,
    EditDestinationComponent,
    EditAgencyComponent,
    DestinationsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
