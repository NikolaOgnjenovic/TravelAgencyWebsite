import { Component } from '@angular/core';
import {Destination} from "../objects/Destination";
import {Router} from "@angular/router";
import {AgencyService} from "../agency.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit-destination',
  templateUrl: './edit-destination.component.html',
  styleUrls: ['./edit-destination.component.css']
})
export class EditDestinationComponent {
  destination: Destination;
  agencyName: string;
  destinationForm: FormGroup;
  constructor(private router: Router, private agencyService: AgencyService) {
    const routerExtras = this.router.getCurrentNavigation()?.extras.state
    this.destination = routerExtras?.['destination'];
    this.agencyName = routerExtras?.['agencyName'];
    this.destinationForm = new FormGroup({
      name: new FormControl(this.destination.name),
      description: new FormControl(this.destination.description),
      type: new FormControl(this.destination.type),
      transport: new FormControl(this.destination.transport),
      price: new FormControl(this.destination.price),
      capacity: new FormControl(this.destination.capacity)
    });
  }

  deleteDestination() {
    if (!confirm("Are you sure that you want to delete this destination?")) {
      console.log("Denied");
    } else {
      this.agencyService.deleteDestination(this.destination, this.agencyName);
      this.router.navigate(['destinations'], {state: {agencyName: this.agencyName}});
    }
  }

  updateDestination() {
    if (!confirm("Are you sure that you want to update this destination?")) {
      console.log("Denied");
    } else {
      this.agencyService.updateDestination(this.destinationForm.value, this.agencyName);
      this.router.navigate(['destinations'], {state: {agencyName: this.agencyName}});
    }
  }
}
