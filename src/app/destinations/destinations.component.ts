import {Component, OnInit} from '@angular/core';
import {Destination} from "../objects/Destination";
import {Router} from "@angular/router";
import {AgencyService} from "../agency.service";

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css'],
})
export class DestinationsComponent implements OnInit {
  allDestinations: Destination[] = [];
  agencyId: number;
  agencyName: string;
  filteredDestinations: Destination[] = [];
  destinationNameSearchText: string = "";
  destinationTypeSearchText: string = "";
  destinationTransportSearchText: string = "";
  constructor(private router: Router, private agencyService: AgencyService) {
    const routerExtras = this.router.getCurrentNavigation()?.extras.state;
    this.agencyId = routerExtras?.['agencyId'];
    this.agencyName = agencyService.getAgencyName(this.agencyId);
  }

  ngOnInit(): void {
    this.allDestinations = this.agencyService.getDestinations(this.agencyId);
    this.filteredDestinations = this.allDestinations;
  }

  viewDestination(destination: Destination) {
    this.router.navigate(['destination'], {state: {destination: destination}});
  }

  editDestination(destination: Destination) {
    this.router.navigate(['edit_destination'], {state: {destination: destination, agencyId: this.agencyId}});
  }

  searchDestinationsByName(destinationName: string) {
    this.filteredDestinations = this.allDestinations.filter(
      (destination) => destination.name.toLowerCase().includes(destinationName.toLowerCase()));
  }

  searchDestinationsByType(destinationType: string) {
    this.filteredDestinations = this.allDestinations.filter(
      (destination) => destination.type.toLowerCase().includes(destinationType.toLowerCase()));
  }

  searchDestinationsByTransport(destinationTransport: string) {
    this.filteredDestinations = this.allDestinations.filter(
      (destination) => destination.transport.toLowerCase().includes(destinationTransport.toLowerCase()));
  }
}
