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
  destinations: Destination[] = [];
  agencyId: number;
  agencyName: string;
  constructor(private router: Router, private agencyService: AgencyService) {
    const routerExtras = this.router.getCurrentNavigation()?.extras.state;
    this.agencyId = routerExtras?.['agencyId'];
    this.agencyName = agencyService.getAgencyName(this.agencyId);
  }

  ngOnInit(): void {
    this.destinations = this.agencyService.getDestinations(this.agencyId);
    console.table(this.destinations);
  }

  viewDestination(destination: Destination) {
    this.router.navigate(['destination'], {state: {destination: destination}});
  }

  editDestination(destination: Destination) {
    this.router.navigate(['edit_destination'], {state: {destination: destination, agencyId: this.agencyId}});
  }
}
