import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AgencyService} from "../agency.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-agency',
  templateUrl: './add-agency.component.html',
  styleUrls: ['./add-agency.component.css', '../margins.css']
})
export class AddAgencyComponent {
  agencyForm: any;

  constructor(private router: Router, private agencyService: AgencyService) {
    this.agencyForm = new FormGroup({
      name: new FormControl(),
      address: new FormControl(),
      foundingYear: new FormControl(),
      logo: new FormControl(),
      phoneNumber: new FormControl(),
      email: new FormControl(),
      destinations: new FormControl(),
    });
  }

  addAgency() {
    if (this.agencyService.validateAgencyForm(this.agencyForm.value)) {
      //this.agencyService.addAgency(this.agencyForm.value);
      this.router.navigate(['home']);
    } else {
      alert("Bad data");
    }
  }
}
