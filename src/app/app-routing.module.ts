import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import { DestinationComponent } from './destination/destination.component';
import {EditUserComponent} from "./edit-user/edit-user.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {EditAgencyComponent} from "./edit-agency/edit-agency.component";
import {DestinationsComponent} from "./destinations/destinations.component";
import {EditDestinationComponent} from "./edit-destination/edit-destination.component";
import {UsersComponent} from "./users/users.component";
import {AddAgencyComponent} from "./add-agency/add-agency.component";
import {AddDestinationComponent} from "./add-destination/add-destination.component";

const routes: Route[] = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'destination', component: DestinationComponent},
  {path: 'destinations', component: DestinationsComponent},
  {path: 'edit_destination', component: EditDestinationComponent},
  {path: 'edit_agency', component: EditAgencyComponent},
  {path: 'edit_user', component: EditUserComponent},
  {path: 'users', component: UsersComponent},
  {path: 'add_agency', component: AddAgencyComponent},
  {path: 'add_destination', component: AddDestinationComponent},
  {path: '**', component: PageNotFoundComponent} // Redirect any other invalid URL to PageNotFound
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
