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
  allAgencies: Agency[] = [];
  filtered_agencies: Agency[] = [];
  allDestinations: Destination[] = [];
  filteredDestinations: Destination[] = [];
  agencyNameSearchText: string = "";
  destinationNameSearchText: string = "";

  constructor(private router: Router, private agencyService: AgencyService) {
    this.allAgencies = agencyService.getAgencies();
    this.filtered_agencies = this.allAgencies;
    this.allDestinations = agencyService.getAllDestinations();
    this.filteredDestinations = this.allDestinations;
  }
  viewDestinations(agencyDestinations: Destination[], agencyId: number) {
    this.router.navigate(['destinations'], {state: {agencyId: agencyId}});
  }

  // TODO: Verification (iako projekat ne trazi)
  isAdmin() {
    return true;
  }
  editAgency(agency: Agency) {
    this.router.navigate(['edit_agency'], {state: {agency: agency}});
  }

  searchAgencies(agencyName: string){
    this.filtered_agencies = this.allAgencies.filter(
      (agency) => agency.name.toLowerCase().includes(agencyName.toLowerCase()));
  }

  searchDestinations(destinationName: string) {
    this.filteredDestinations = this.allDestinations.filter(
      (destination) => destination.name.toLowerCase().includes(destinationName.toLowerCase()));
  }
}
