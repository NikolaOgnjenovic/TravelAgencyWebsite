import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AgencyService} from "../agency.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-agency',
  templateUrl: './add-agency.component.html',
  styleUrls: ['./add-agency.component.css', '../card.css', '../validation.css']
})
export class AddAgencyComponent {
  agencyForm: FormGroup;

  constructor(private router: Router, private agencyService: AgencyService) {
    this.agencyForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      foundingYear: new FormControl('',[Validators.required, Validators.pattern(/([0-9]+$)/g)]),
      logo: new FormControl('',[Validators.required]),
      phoneNumber: new FormControl('',[Validators.required, Validators.pattern(/([0-9]+)+\/([0-9]+)-([0-9]+)$/g)]),
      email: new FormControl('',[Validators.required, Validators.email]),
    });
  }

  addAgency() {
    if (!confirm("Are you sure that you want to add this agency?")) {
      return;
    }

    if (this.agencyForm.valid) {
      this.agencyService.addAgency(this.agencyForm.value);
      this.router.navigate(['home']);
    }
  }
}
