import { Component } from '@angular/core';
import {Destination} from "../objects/Destination";
import {Router} from "@angular/router";

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent {
  destination: Destination;
  constructor(private router: Router) {
    this.destination = this.router.getCurrentNavigation()?.extras.state?.['destination'];
    console.table(this.destination);
  }
}
