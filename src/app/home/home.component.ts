import {Component, OnInit} from '@angular/core';
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
export class HomeComponent implements OnInit {
  allAgencies: Map<string, Agency>  = new Map<string, Agency>;
  filteredAgencies: Map<string, Agency> = new Map<string, Agency>;
  allDestinations: Map<string, Destination> = new Map<string, Destination>;
  filteredDestinations: Map<string, Destination> = new Map<string, Destination>;
  agencyNameSearchText: string = "";
  destinationNameSearchText: string = "";
  highlightedAgency: Agency | undefined;

  constructor(private router: Router, private agencyService: AgencyService) {
  }

  ngOnInit() {
    this.allAgencies = this.agencyService.getAgencies();
    this.filteredAgencies = this.allAgencies;
    this.allDestinations = this.agencyService.getDestinations();
    this.filteredDestinations = this.allDestinations;
    this.highlightedAgency = this.getRandomAgency();
  }

  // TODO: random nece jer dugo ucitava agencije
  getRandomAgency(): Agency | undefined {
    console.table(this.allAgencies);
    console.log(this.allAgencies.keys());
    let keys = [...this.allAgencies.keys()];
    console.log("keys: " + keys);
    let randomKey = keys[Math.floor(Math.random() * keys.length)];
    console.log("random key: " + randomKey);
    return this.allAgencies.get(randomKey);
  }
  viewDestinations(agencyId: string): void {
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
