import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Destination} from "../objects/Destination";

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css', '../app.component.css']
})
export class DestinationComponent {
  destination: Destination;
  constructor(private router: Router) {
    this.destination = this.router.getCurrentNavigation()?.extras.state?.['destination'];
  }
}
