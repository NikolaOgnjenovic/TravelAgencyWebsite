import {Component, ViewEncapsulation} from '@angular/core';
import {Agency} from "../objects/Agency";
import {Destination} from "../objects/Destination";
import {Router} from "@angular/router";
import {AgencyService} from "../agency.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  agencies: Agency[] = [];

  constructor(private router: Router, private agencyService: AgencyService) {
    this.agencies = agencyService.getAgencies();
  }
  /*viewDestination(agencyDestination: Destination) {
    this.router.navigate(['destination'], {state: {destination: agencyDestination}});
    console.log("VIEW DESITNATIONS");
  }*/
  viewDestinations(agencyDestinations: Destination[], agencyName: string) {
    this.router.navigate(['destinations'], {state: {agencyName: agencyName}});
    console.log("VIEW DESITNATIONS");
  }

  // TODO: Verification (iako projekat ne trazi)
  isAdmin() {
    return true;
  }
  editAgency(agency: Agency) {
    this.router.navigate(['edit_agency'], {state: {agency: agency}});
  }
}
