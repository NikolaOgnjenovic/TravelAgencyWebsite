import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AgencyService} from "../agency.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-destination',
  templateUrl: './edit-destination.component.html',
  styleUrls: ['./edit-destination.component.css', '../svg-before.css', '../card.css', '../validation.css']
})
export class EditDestinationComponent implements OnInit{
  destinationId: string;
  destination: any;
  agencyId: string;
  destinationForm: FormGroup;
  typeLabel: HTMLElement | null = null;
  transportLabel: HTMLElement | null = null;
  constructor(private router: Router, private agencyService: AgencyService) {
    const routerExtras = this.router.getCurrentNavigation()?.extras.state;
    this.destinationId = routerExtras?.['destinationId'];
    this.destination = agencyService.getDestination(this.destinationId);
    this.agencyId = routerExtras?.['agencyId'];
    this.destinationForm = new FormGroup({
      name: new FormControl(this.destination.name, Validators.required),
      description: new FormControl(this.destination.description, Validators.required),
      type: new FormControl(this.destination.type, Validators.required),
      transport: new FormControl(this.destination.transport, Validators.required),
      price: new FormControl(this.destination.price, [Validators.required, Validators.pattern(/([0-9]+$)/g)]),
      capacity: new FormControl(this.destination.capacity, [Validators.required, Validators.pattern(/([0-9]+$)/g)])
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

  deleteDestination() {
    if (!confirm("Are you sure that you want to delete this destination?")) {
      return;
    }
    this.agencyService.deleteDestination(this.destinationId);
    this.router.navigate(['destinations'], {state: {agencyId: this.agencyId}});
  }

  updateDestination() {
    if (!confirm("Are you sure that you want to update this destination?")) {
      return;
    }
    if (this.destinationForm.valid) {
      this.agencyService.updateDestination(this.destinationForm.value, this.destinationId, this.destination.destinationGroupId, this.destination.images);
      this.router.navigate(['destinations'], {state: {agencyId: this.agencyId}});
    }
  }
}
