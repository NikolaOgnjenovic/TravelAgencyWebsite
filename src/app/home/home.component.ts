import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {AgencyService} from "../agency.service";
import {Destination} from "../objects/Destination";
import {AuthService} from "../auth.service";
import {Agency} from "../objects/Agency";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  allAgencies: Map<string, Agency>  = new Map<string, Agency>;
  filteredAgencies: Map<string, Agency> = new Map<string, Agency>;
  allDestinations: Map<string, Destination> = new Map<string, Destination>;
  filteredDestinations: Map<string, Destination> = new Map<string, Destination>;
  agencyNameSearchText: string = "";
  destinationNameSearchText: string = "";

  constructor(private router: Router, private agencyService: AgencyService) {
    this.allAgencies = agencyService.getAgencies();
    this.filteredAgencies = this.allAgencies;
    this.allDestinations = agencyService.getDestinations();
    this.filteredDestinations = this.allDestinations;
  }
  viewDestinations(agencyId: string): void {
    this.router.navigate(['destinations'], {state: {agencyId: agencyId}});
  }

  isAdmin(): boolean {
    return AuthService.isAdmin;
  }
  editAgency(agencyId: string): void {
    this.router.navigate(['edit_agency'], {state: {agencyId: agencyId}});
  }

  searchAgencies(agencyName: string): void {
    this.filteredAgencies = new Map(Array.from(this.allAgencies).filter(
      ([key, val]) => val.name.toLowerCase().includes(agencyName.toLowerCase())));
  }

  searchDestinations(destinationName: string): void {
    this.filteredDestinations = new Map(Array.from(this.allDestinations).filter(
      ([key, val]) => val.name.toLowerCase().includes(destinationName.toLowerCase())));
  }
}
