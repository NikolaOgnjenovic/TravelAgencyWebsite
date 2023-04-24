import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Destination} from "../objects/Destination";
import {IconSetterService} from "../icon-setter.service";

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css', '../svg-before.css']
})
export class DestinationComponent implements OnInit{
  destination: Destination;
  agencyId: string; // Used for going back
  selectedIndex: number = 0;
  slideInterval: number = 6000;
  type: HTMLElement | null = null;
  transport: HTMLElement | null = null;
  constructor(private router: Router, private iconSetterService: IconSetterService) {
    this.destination = this.router.getCurrentNavigation()?.extras.state?.['destination'];
    this.agencyId = this.router.getCurrentNavigation()?.extras.state?.['agencyId'];
    this.slideImages();
  }

  ngOnInit() {
    this.type = document.getElementById("type");
    this.transport = document.getElementById("transport");
    this.setIcons();
  }

  setIcons() {
    if (this.transport != null) {
      this.iconSetterService.setTransportationIconPath(this.destination.transport, this.transport);
    }

    if (this.type != null) {
      this.iconSetterService.setVacationTypeIconPath(this.destination.type, this.type);
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

  back() {
    this.router.navigate(['destinations'], {state: {agencyId: this.agencyId}});
  }
}
