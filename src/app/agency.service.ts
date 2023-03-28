import {Injectable} from '@angular/core';
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
            new Destination({
              name: "Prag",
              description: "Putovanje u Prag",
              //photos: slika[];
              type: "Letovanje", // Letovanje, zimovanje, gradovi Evrope
              transport: "Avionom", // avion, autobus, sopstveni prevoz
              price: 100,
              capacity: 40, // max broj osoba
            }),
            new Destination({
              name: "Ljubljana",
              description: "Putovanje u Ljubljanu",
              //photos: slika[];
              type: "Letovanje", // Letovanje, zimovanje, gradovi Evrope
              transport: "Autobusom", // avion, autobus, sopstveni prevoz
              price: 200,
              capacity: 50, // max broj osoba
            })
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
            new Destination({
              name: "Prag",
              description: "Putovanje u Prag",
              //photos: slika[];
              type: "Letovanje", // Letovanje, zimovanje, gradovi Evrope
              transport: "Avionom", // avion, autobus, sopstveni prevoz
              price: 100,
              capacity: 40, // max broj osoba
            }),
            new Destination({
              name: "Ljubljana",
              description: "Putovanje u Ljubljanu",
              //photos: slika[];
              type: "Letovanje", // Letovanje, zimovanje, gradovi Evrope
              transport: "Autobusom", // avion, autobus, sopstveni prevoz
              price: 200,
              capacity: 50, // max broj osoba
            })
          ]}
      ));
  }

  getAgencies(): Agency[] {
    return this.agencies;
  }

  getAgencyIndex(agencyId: number) {
    return this.agencies.findIndex(a => a.id == agencyId);
  }
  getAgencyName(agencyId: number): string {
    return this.agencies[this.getAgencyIndex(agencyId)].name;
  }

  getDestinations(agencyId: number): Destination[] {
    return this.agencies[this.getAgencyIndex(agencyId)].destinations;
  }

  private getDestinationIndex(destination: Destination, agencyId: number): number {
    return this.getDestinations(agencyId).findIndex(d => d.id == destination.id);
  }

  updateDestination(destination: Destination, agencyId: number, destinationId: number) {
    destination.id = destinationId; // The edit-destination component sends a DestinationForm without an id
    let destinationIndex = this.getDestinationIndex(destination, agencyId);
    if (destinationIndex == -1) {
      return;
    }
    console.log(destinationIndex);
    console.table(this.getDestinations(agencyId));
    this.getDestinations(agencyId)[destinationIndex] = destination;
    console.table(this.getDestinations(agencyId));
  }

  deleteDestination(destination: Destination, agencyId: number) {
    let destinationIndex = this.getDestinationIndex(destination, agencyId);
    if (destinationIndex == -1) {
      return;
    }
    this.getDestinations(agencyId).splice(destinationIndex, 1);
  }

  updateAgency(agency: Agency, agencyId: number, destinations: Destination[]) {
    let agencyIndex = this.getAgencyIndex(agencyId);
    if (agencyIndex != -1) {
      this.agencies[agencyIndex] = agency;
      this.agencies[agencyIndex].destinations = destinations;
    }
  }

  deleteAgency(agencyId: number) {
    let agencyIndex = this.getAgencyIndex(agencyId);
    if (agencyIndex != -1) {
      this.agencies.splice(agencyIndex, 1);
    }
  }
}
