import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Destination} from "../objects/Destination";

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css', '../margins.css']
})
export class DestinationComponent implements OnInit{
  destination: Destination;
  selectedIndex: number = 0;
  slideInterval: number = 6000;
  type: HTMLElement | null = null;
  transport: HTMLElement | null = null;
  constructor(private router: Router) {
    this.destination = this.router.getCurrentNavigation()?.extras.state?.['destination'];
    this.slideImages();
  }

  ngOnInit() {
    this.type = document.getElementById("type");
    this.transport = document.getElementById("transport");
    this.setIcons();
  }

  setIcons() {
    if (this.transport != null) {
      let transportIconPath = "";
      switch (this.destination.transport) {
        case "airplane":
          transportIconPath = "/assets/images/airplane.svg";
          break;
        case "bus":
          console.log("BUS!!");
          transportIconPath = "/assets/images/bus.svg";
          break;
        case "personal":
          transportIconPath = "/assets/images/personal.svg";
          break;
      }
      this.transport.style.setProperty("--url", "url(" + transportIconPath + ")");
    }

    if (this.type != null) {
      let typeIconPath = "";
      switch (this.destination.type) {
        case "summer":
          typeIconPath = "/assets/images/summer.svg";
          break;
        case "winter":
          console.log("BUS!!");
          typeIconPath = "/assets/images/winter.svg";
          break;
        case "europeanCities":
          typeIconPath = "/assets/images/eu.svg";
          break;
      }
      this.type.style.setProperty("--url", "url(" + typeIconPath + ")");
    }
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
