import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AgencyService} from "../agency.service";

@Component({
  selector: 'app-add-destination',
  templateUrl: './add-destination.component.html',
  styleUrls: ['./add-destination.component.css', '../svg-before.css', '../card.css', '../validation.css']
})
export class AddDestinationComponent {
  destinationForm: FormGroup;
  agencyId: string;
  destinationGroupId: string;
  typeLabel: HTMLElement | null = null;
  transportLabel: HTMLElement | null = null;
  constructor(private router: Router, private agencyService: AgencyService) {
    const routerExtras = this.router.getCurrentNavigation()?.extras.state;
    this.agencyId = routerExtras?.['agencyId'];
    this.destinationGroupId = routerExtras?.['destinationGroupId'];
    this.destinationForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      transport: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.pattern(/([0-9]+$)/g)]),
      capacity: new FormControl('', [Validators.required, Validators.pattern(/([0-9]+$)/g)])
    });
  }

  ngOnInit() {
    this.typeLabel = document.getElementById("type");
    this.transportLabel = document.getElementById("transport");
    this.setIcons();
  }

  setIcons() {
    if (this.transportLabel != null) {
      let transportIconPath = "";
      switch (this.destinationForm.get('transport')?.value) {
        case "airplane":
          transportIconPath = "/assets/images/airplane.svg";
          break;
        case "bus":
          transportIconPath = "/assets/images/bus.svg";
          break;
        case "personal":
          transportIconPath = "/assets/images/car.svg";
          break;
      }
      this.transportLabel.style.setProperty("--url", "url(" + transportIconPath + ")");
    }

    if (this.typeLabel != null) {
      let typeIconPath = "";
      switch (this.destinationForm.get('type')?.value) {
        case "summer":
          typeIconPath = "/assets/images/summer.svg";
          break;
        case "winter":
          typeIconPath = "/assets/images/winter.svg";
          break;
        case "europeanCities":
          this.typeLabel.textContent = "European cities";
          typeIconPath = "/assets/images/eu.svg";
          break;
      }
      this.typeLabel.style.setProperty("--url", "url(" + typeIconPath + ")");
    }
  }

  addDestination() {
    if (!confirm("Are you sure that you want to add this destination?")) {
      return;
    }
    if (this.destinationForm.valid) {
      this.agencyService.addDestination(this.destinationForm.value, this.destinationGroupId);
      this.router.navigate(['destinations'], {state: {agencyId: this.agencyId}});
    }
  }
}
