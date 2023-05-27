import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AgencyService} from "../agency.service";
import {Destination} from "../objects/Destination";
import {AuthService} from "../auth.service";
import {Agency} from "../objects/Agency";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../card.css']
})
export class HomeComponent {
  allAgencies: Map<string, Agency>  = new Map<string, Agency>;
  filteredAgencies: Map<string, Agency> = new Map<string, Agency>;
  allDestinations: Map<string, Destination> = new Map<string, Destination>;
  filteredDestinations: Map<string, Destination> = new Map<string, Destination>;
  agencyNameSearchText: string = "";
  destinationNameSearchText: string = "";
  highlightedAgency: Agency | undefined;

  constructor(private router: Router, private agencyService: AgencyService) {
    this.allAgencies = this.agencyService.getAgencies();
    this.filteredAgencies = this.allAgencies;
    this.allDestinations = this.agencyService.getDestinations();
    this.filteredDestinations = this.allDestinations;
    this.highlightedAgency = {
      name: "Agency name",
      address: "Address",
      foundingYear: "2010.",
      logo: "/assets/images/agency-placeholder.svg",
      phoneNumber: "123/456-789",
      email: "email@email.com",
      destinations: "",
      filteredDestinations: new Map<string, Destination>,
    };
    this.highlightedAgency.key = this.getRandomAgencyKey();
    console.log("Highlighted key: " + this.highlightedAgency.key);
    this.highlightedAgency = this.allAgencies.get(this.highlightedAgency.key);
  }

  getRandomAgencyKey(): string {
    let keys = [...this.allAgencies.keys()];
    return keys[Math.floor(Math.random() * keys.length)];
  }

  viewDestinations(agencyId: string | undefined | null): void {
    if (agencyId == null) {
      return;
    }
    this.router.navigate(['destinations'], {state: {agencyId: agencyId}});
  }

  isAdmin(): boolean {
    return AuthService.isAdmin;
  }

  addAgency(): void {
    this.router.navigate(['edit_agency']);
  }
  editAgency(agencyId: string): void {
    this.router.navigate(['edit_agency'], {state: {agencyId: agencyId}});
  }

  searchAgencies(agencyName: string): void {
    this.filteredAgencies = new Map(Array.from(this.allAgencies).filter(
      ([, val]) => val.name.toLowerCase().includes(agencyName.toLowerCase())));
  }

  searchDestinations(destinationName: string): void {
    this.filteredDestinations = new Map(Array.from(this.allDestinations).filter(
      ([, val]) => val.name.toLowerCase().includes(destinationName.toLowerCase())));
  }
}
