import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EditDestinationComponent } from './edit-destination/edit-destination.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AgencyNotFoundComponent } from './agency-not-found/agency-not-found.component';
import { DestinationComponent } from './destination/destination.component';
import { EditAgencyComponent } from './edit-agency/edit-agency.component';
import { DestinationsComponent } from './destinations/destinations.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UsersComponent } from './users/users.component';
import { AgencySearchFilterPipe } from './agency-search-filter.pipe';
import { DestinationSearchFilterPipe } from './destination-search-filter.pipe';
import {NgOptimizedImage} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DestinationComponent,
    EditUserComponent,
    PageNotFoundComponent,
    AgencyNotFoundComponent,
    EditDestinationComponent,
    EditAgencyComponent,
    DestinationsComponent,
    UsersComponent,
    AgencySearchFilterPipe,
    DestinationSearchFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgOptimizedImage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
