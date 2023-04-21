import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AgencyService} from "../agency.service";

@Component({
  selector: 'app-add-destination',
  templateUrl: './add-destination.component.html',
  styleUrls: ['./add-destination.component.css', '../margins.css', '../card.css']
})
export class AddDestinationComponent {
  destinationForm: FormGroup;
  agencyId: string;
  constructor(private router: Router, private agencyService: AgencyService) {
    const routerExtras = this.router.getCurrentNavigation()?.extras.state;
    this.agencyId = routerExtras?.['agencyId'];
    this.destinationForm = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      type: new FormControl(),
      transport: new FormControl(),
      price: new FormControl(),
      capacity: new FormControl()
    });
  }

  addDestination() {
    if (!confirm("Are you sure that you want to add this destination?")) {
      return;
    }
    if (this.agencyService.validateDestinationForm(this.destinationForm.value)) {
      this.agencyService.addDestination(this.destinationForm.value);
      this.router.navigate(['destinations'], {state: {agencyId: this.agencyId}});
    } else {
      // TODO: style invalid inputs
    }
  }
}
