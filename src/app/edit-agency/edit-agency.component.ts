import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Agency} from "../objects/Agency";

@Component({
  selector: 'app-edit-agency',
  templateUrl: './edit-agency.component.html',
  styleUrls: ['./edit-agency.component.css']
})
export class EditAgencyComponent {
  agency: Agency;
  constructor(private router: Router) {
    this.agency = this.router.getCurrentNavigation()?.extras.state?.['agency'];
  }
}
