import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Destination} from "../objects/Destination";

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css', '../margins.css']
})
export class DestinationComponent {
  destination: Destination;
  selectedIndex: number = 0;
  slideInterval: number = 6000;
  constructor(private router: Router) {
    this.destination = this.router.getCurrentNavigation()?.extras.state?.['destination'];
    this.slideImages();
  }

  selectImage(i: number) {
    this.selectedIndex = i;
  }

  slideImages() {
    setInterval(() => {
      if (this.selectedIndex === this.destination.images.length - 1) {
        this.selectedIndex = 0;
      } else {
        this.selectedIndex++;
      }
    }, this.slideInterval);
  }
}
