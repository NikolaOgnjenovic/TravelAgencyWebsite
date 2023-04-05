import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AgencyService} from "../agency.service";
import {Destination} from "../objects/Destination";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css', '../app.component.css']
})
export class DestinationsComponent implements OnInit {
  allDestinations: Map<string, Destination> = new Map<string, Destination>;
  filteredDestinations: Map<string, Destination> = new Map<string, Destination>;
  agencyId: string;
  agency: any;
  agencyName: string;
  destinationNameSearchText: string = "";
  destinationTypeSearchText: string = "";
  destinationTransportSearchText: string = "";
  constructor(private router: Router, private agencyService: AgencyService) {
    const routerExtras = this.router.getCurrentNavigation()?.extras.state;
    this.agencyId = routerExtras?.['agencyId'];
    this.agency = agencyService.getAgency(this.agencyId);
    this.agencyName = this.agency.name;
  }

  ngOnInit(): void {
    this.allDestinations = this.agencyService.getDestinationsByGroupId(this.agency.destinations);
    this.filteredDestinations = this.allDestinations;
  }

  viewDestination(destination: Destination) {
    this.router.navigate(['destination'], {state: {destination: destination}});
  }

  editDestination(destinationId: string) {
    this.router.navigate(['edit_destination'], {state: {destinationId: destinationId , agencyId: this.agencyId}});
  }

  searchDestinationsByName(destinationName: string) {
    this.filteredDestinations = new Map(Array.from(this.allDestinations).filter(
      ([key, val]) => val.name.toLowerCase().includes(destinationName.toLowerCase())));
  }

  searchDestinationsByType(destinationType: string) {
    this.filteredDestinations = new Map(Array.from(this.allDestinations).filter(
      ([key, val]) => val.type.toLowerCase().includes(destinationType.toLowerCase())));
  }

  searchDestinationsByTransport(destinationTransport: string) {
    this.filteredDestinations = new Map(Array.from(this.allDestinations).filter(
      ([key, val]) => val.transport.toLowerCase().includes(destinationTransport.toLowerCase())));
  }

  isAdmin() {
    return AuthService.isAdmin;
  }
}
