import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AgencyService} from "../agency.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Agency} from "../objects/Agency";

@Component({
  selector: 'app-edit-agency',
  templateUrl: './edit-agency.component.html',
  styleUrls: ['./edit-agency.component.css']
})
export class EditAgencyComponent {
  agency: Agency;
  agencyForm: FormGroup;
  constructor(private router: Router, private agencyService: AgencyService) {
    const routerExtras = this.router.getCurrentNavigation()?.extras.state
    this.agency = routerExtras?.['agency'];
    console.table(this.agency);
    this.agencyForm = new FormGroup({
      name: new FormControl(this.agency.name),
      address: new FormControl(this.agency.address),
      founded_year: new FormControl(this.agency.founded_year),
      phone_number: new FormControl(this.agency.phone_number),
      email: new FormControl(this.agency.email),
    });
  }

  deleteAgency() {
    if (!confirm("Are you sure that you want to delete this agency?")) {
      console.log("Denied");
    } else {
      this.agencyService.deleteAgency(this.agency.id);
      this.router.navigate(['home']);
    }
  }

  updateAgency() {
    if (!confirm("Are you sure that you want to update this agency?")) {
      console.log("Denied");
    } else {
      this.agencyService.updateAgency(this.agencyForm.value, this.agency.id, this.agency.destinations);
      this.router.navigate(['home']);
    }
  }
}
