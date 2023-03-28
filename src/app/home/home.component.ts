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
  viewDestinations(agencyDestinations: Destination[], agencyId: number) {
    this.router.navigate(['destinations'], {state: {agencyId: agencyId}});
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
