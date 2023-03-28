import {Destination} from "./Destination";

export class Agency {
  name: string;
  address: string;
  founded_year: string;
  //logo: slika;
  phone_number: string;
  email: string;
  destinations: Destination[];
  id: number; // TODO: promeni na firebase ID
  static counter = 0; // zato sto system.time da isto vreme za moje hard-coded vrednosti
  constructor(agency: any) {
    this.name = agency.name;
    this.address = agency.address;
    this.founded_year = agency.founded_year;
    this.phone_number = agency.phone_number;
    this.email = agency.email;
    this.destinations = agency.destinations;
    this.id = this.generateId();
  }

  private generateId(): number {
    let newId = new Date().getTime() + Agency.counter;
    Agency.counter += 1000;
    return newId;
  }
}
