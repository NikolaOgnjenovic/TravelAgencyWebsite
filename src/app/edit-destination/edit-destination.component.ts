import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AgencyService} from "../agency.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IconSetterService} from "../icon-setter.service";

@Component({
  selector: 'app-edit-destination',
  templateUrl: './edit-destination.component.html',
  styleUrls: ['./edit-destination.component.css', '../svg-before.css', '../card.css', '../validation.css']
})
export class EditDestinationComponent implements OnInit{
  destinationId: string;
  destinationGroupId: string;
  destination: any = undefined;
  agencyId: string;
  destinationForm: FormGroup;
  typeLabel: HTMLElement | null = null;
  transportLabel: HTMLElement | null = null;
  titleText: string = "";

  constructor(private router: Router, private agencyService: AgencyService, private iconSetterService: IconSetterService) {
    const routerExtras = this.router.getCurrentNavigation()?.extras.state;
    this.agencyId = routerExtras?.['agencyId'];
    this.destinationId = routerExtras?.['destinationId'];
    this.destinationGroupId = routerExtras?.['destinationGroupId'];

    let destination = agencyService.getDestination(this.destinationId);
    console.log(this.destination);
    // Editing
    if (destination != undefined) {
      this.destination = destination;

      this.destinationForm = new FormGroup({
        name: new FormControl(this.destination.name, Validators.required),
        description: new FormControl(this.destination.description, Validators.required),
        type: new FormControl(this.destination.type, Validators.required),
        transport: new FormControl(this.destination.transport, Validators.required),
        price: new FormControl(this.destination.price, [Validators.required, Validators.pattern(/([0-9]+$)/g)]),
        capacity: new FormControl(this.destination.capacity, [Validators.required, Validators.pattern(/([0-9]+$)/g)])
      });

      this.titleText = "Edit destination";
    }
    // Adding
    else {
      this.destinationForm = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        type: new FormControl('', Validators.required),
        transport: new FormControl('', Validators.required),
        price: new FormControl('', [Validators.required, Validators.pattern(/([0-9]+$)/g), Validators.min(0)]),
        capacity: new FormControl('', [Validators.required, Validators.pattern(/([0-9]+$)/g), Validators.min(0)])
      });

      this.titleText = "Add destination";
    }
  }

  ngOnInit() {
    this.typeLabel = document.getElementById("type");
    this.transportLabel = document.getElementById("transport");
    let title = document.getElementById("title");
    if (title != null) {
      title.innerText = this.titleText;
    }
    this.setIcons();
  }

  setIcons() {
    if (this.transportLabel != null) {
      this.iconSetterService.setTransportationIconPath(this.destinationForm.get('transport')?.value, this.transportLabel);
    }
    if (this.typeLabel != null) {
      this.iconSetterService.setVacationTypeIconPath(this.destinationForm.get('type')?.value, this.typeLabel);
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

  updateDestination() {
    if (!confirm("Are you sure that you want to update this destination?")) {
      return;
    }
    if (this.destinationForm.valid) {
      this.agencyService.updateDestination(this.destinationForm.value, this.destinationId, this.destination.destinationGroupId, this.destination.images);
      this.router.navigate(['destinations'], {state: {agencyId: this.agencyId}});
    }
  }

  deleteDestination() {
    if (!confirm("Are you sure that you want to delete this destination?")) {
      return;
    }
    this.agencyService.deleteDestination(this.destinationId);
    this.router.navigate(['destinations'], {state: {agencyId: this.agencyId}});
  }
}
