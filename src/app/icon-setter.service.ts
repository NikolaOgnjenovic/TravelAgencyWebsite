import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconSetterService {

  setTransportationIconPath(transportType: string, transportLabel: HTMLElement) {
    let transportIconPath: string;
    switch (transportType) {
      case "airplane":
        transportIconPath = "/assets/images/airplane.svg";
        break;
      case "bus":
        transportIconPath = "/assets/images/bus.svg";
        break;
      case "personal":
        transportIconPath = "/assets/images/car.svg";
        break;
      default:
        transportIconPath = "/assets/images/airplane.svg";
        break;
    }
    transportLabel.style.setProperty("--url", "url(" + transportIconPath + ")");
  }
  setVacationTypeIconPath(vacationType: string, typeLabel: HTMLElement) {
    let typeIconPath: string;
    switch (vacationType) {
      case "summer":
        typeIconPath = "/assets/images/summer.svg";
        break;
      case "winter":
        typeIconPath = "/assets/images/winter.svg";
        break;
      case "europeanCities":
        typeLabel.textContent = "European cities";
        typeIconPath = "/assets/images/eu.svg";
        break;
      default:
        typeIconPath = "/assets/images/summer.svg";
        break;
    }
    typeLabel.style.setProperty("--url", "url(" + typeIconPath + ")");
  }
}
