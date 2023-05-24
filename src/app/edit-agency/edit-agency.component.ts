import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AgencyService} from "../agency.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-agency',
  templateUrl: './edit-agency.component.html',
  styleUrls: ['./edit-agency.component.css', '../card.css', '../validation.css']
})
export class EditAgencyComponent implements OnInit {
  agencyId: string;
  agency: any = undefined;
  agencyForm: any;
  titleText: string = "";
  constructor(private router: Router, private agencyService: AgencyService) {
    const routerExtras = this.router.getCurrentNavigation()?.extras.state;
    this.agencyId = routerExtras?.['agencyId'];

    let agency = agencyService.getAgency(this.agencyId);
    // Editing
    if (agency != undefined) {
      this.agency = agency;
      this.agencyForm = new FormGroup({
        name: new FormControl(this.agency.name, [Validators.required]),
        address: new FormControl(this.agency.address, [Validators.required]),
        logo: new FormControl(this.agency.logo, [Validators.required]),
        foundingYear: new FormControl(this.agency.foundingYear,[Validators.required, Validators.pattern(/([0-9]+$)/g)]),
        phoneNumber: new FormControl(this.agency.phoneNumber,[Validators.required, Validators.pattern(/([0-9]+)+\/([0-9]+)-([0-9]+)$/g)]),
        email: new FormControl(this.agency.email,[Validators.required, Validators.email]),
      });

      this.titleText = "Edit agency";
    }
    // Adding
    else {
      this.agencyForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        foundingYear: new FormControl('',[Validators.required, Validators.pattern(/([0-9]+$)/g)]),
        logo: new FormControl('',[Validators.required]),
        phoneNumber: new FormControl('',[Validators.required, Validators.pattern(/([0-9]+)+\/([0-9]+)-([0-9]+)$/g)]),
        email: new FormControl('',[Validators.required, Validators.email]),
      });

      this.titleText = "Add agenecy";
    }
  }

  ngOnInit() {
    let title = document.getElementById("title");
    if (title != null) {
      title.innerText = this.titleText;
    }
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

  updateAgency() {
    if (!confirm("Are you sure that you want to update this agency?")) {
      return;
    }
    if (this.agencyForm.valid) {
      this.agencyService.updateAgency(this.agencyForm.value, this.agencyId, this.agency.destinations);
      this.router.navigate(['home']);
    }
  }

  deleteAgency() {
    if (!confirm("Are you sure that you want to delete this agency?")) {
      return;
    }

    this.agencyService.deleteAgency(this.agencyId);
    this.router.navigate(['home']);
  }
}
