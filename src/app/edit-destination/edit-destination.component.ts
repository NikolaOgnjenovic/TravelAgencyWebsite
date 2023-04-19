import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AgencyService} from "../agency.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit-destination',
  templateUrl: './edit-destination.component.html',
  styleUrls: ['./edit-destination.component.css', '../card.css', '../margins.css']
})
export class EditDestinationComponent {
  destinationId: string;
  destination: any;
  agencyId: string;
  destinationForm: FormGroup;
  constructor(private router: Router, private agencyService: AgencyService) {
    const routerExtras = this.router.getCurrentNavigation()?.extras.state
    this.destinationId = routerExtras?.['destinationId'];
    this.destination = agencyService.getDestination(this.destinationId);
    this.agencyId = routerExtras?.['agencyId'];
    this.destinationForm = new FormGroup({
      name: new FormControl(this.destination.name),
      description: new FormControl(this.destination.description),
      type: new FormControl(this.destination.type),
      transport: new FormControl(this.destination.transport),
      price: new FormControl(this.destination.price),
      capacity: new FormControl(this.destination.capacity),
    });
  }

  deleteDestination() {
    if (!confirm("Are you sure that you want to delete this destination?")) {
      console.log("Denied");
    } else {
      this.agencyService.deleteDestination(this.destinationId);
      this.router.navigate(['destinations'], {state: {agencyId: this.agencyId}});
    }
  }

  updateDestination() {
    if (!confirm("Are you sure that you want to update this destination?")) {
      alert("Denied");
    } else {
      console.table(this.destinationForm.value);
      if (this.agencyService.validateDestinationForm(this.destinationForm.value)) {
        this.agencyService.updateDestination(this.destinationForm.value, this.destinationId, this.destination.destinationGroupId, this.destination.images);
        this.router.navigate(['destinations'], {state: {agencyId: this.agencyId}});
      } else {
        alert("Bad data");
      }
    }
  }
}
