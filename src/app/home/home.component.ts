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
  all_agencies: Agency[] = [];
  filtered_agencies: Agency[] = [];
  all_destinations: Destination[] = [];
  filtered_destinations: Destination[] = [];
  agencyNameSearchText: string = "";
  destinationNameSearchText: string = "";

  constructor(private router: Router, private agencyService: AgencyService) {
    this.all_agencies = agencyService.getAgencies();
    this.filtered_agencies = this.all_agencies;
    this.all_destinations = agencyService.getAllDestinations();
    this.filtered_destinations = this.all_destinations;
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

  searchAgencies(agencyName: string){
    this.filtered_agencies = this.all_agencies.filter(
      (agency) => agency.name.toLowerCase().includes(agencyName.toLowerCase()));
  }

  searchDestinations(destinationName: string) {
    this.filtered_destinations = this.all_destinations.filter(
      (destination) => destination.name.toLowerCase().includes(destinationName.toLowerCase()));
  }
}
