import { Injectable } from '@angular/core';
import {Agency} from "./objects/Agency";
import {Destination} from "./objects/Destination";

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  private agencies: Agency[] = [];
  constructor() {
    this.agencies.push(
      new Agency(
        {
          name: "Mrmi travel",
          address: "2023",
          founded_year: 2023,
          phone_number: "+38166",
          email: "email@email.com",
          destinations: [
            {
              name: "Prag",
              description: "Putovanje u Prag",
              //photos: slika[];
              type: "Letovanje", // Letovanje, zimovanje, gradovi Evrope
              transport: "Avionom", // avion, autobus, sopstveni prevoz
              price: 100,
              capacity: 40 // max broj osoba
            },
            {
              name: "Ljubljana",
              description: "Putovanje u Ljubljanu",
              //photos: slika[];
              type: "Letovanje", // Letovanje, zimovanje, gradovi Evrope
              transport: "Autobusom", // avion, autobus, sopstveni prevoz
              price: 200,
              capacity: 50 // max broj osoba
            }
          ]}
      ),
      new Agency(
        {
          name: "Marina travel",
          address: "adrs",
          founded_year: 2021,
          phone_number: "+38165",
          email: "email@email.com",
          destinations: [
            {
              name: "Prag",
              description: "Putovanje u Prag",
              //photos: slika[];
              type: "Letovanje", // Letovanje, zimovanje, gradovi Evrope
              transport: "Avionom", // avion, autobus, sopstveni prevoz
              price: 100,
              capacity: 40 // max broj osoba
            },
            {
              name: "Ljubljana",
              description: "Putovanje u Ljubljanu",
              //photos: slika[];
              type: "Letovanje", // Letovanje, zimovanje, gradovi Evrope
              transport: "Autobusom", // avion, autobus, sopstveni prevoz
              price: 200,
              capacity: 50 // max broj osoba
            }
          ]}
      ));
  }

  getAgencies(): Agency[] {
    return this.agencies;
  }

  deleteDestination(destination: Destination, agencyName: string) {
    this.agencies.forEach((a) => {
      if (a.name == agencyName) {
        const destinationIndex = a.destinations.findIndex(d => d.id == destination.id);
        a.destinations.splice(destinationIndex, 1);
      }
    });
  }

  getDestinations(agencyName: string): Destination[] {
    let destinations: Destination[] = [];
    this.agencies.forEach((a) => {
      if (a.name == agencyName) {
        destinations = a.destinations;
      }
    });
    return destinations;
  }

  updateDestination(destination: Destination, agencyName: string) {
    this.agencies.forEach((a) => {
      if (a.name == agencyName) {
        const destinationIndex = a.destinations.findIndex(d => d.id == destination.id);
        if (destinationIndex == -1) {
          return;
        }
        a.destinations[destinationIndex] = destination;
      }
    });
  }
}
