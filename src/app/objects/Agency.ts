import {Destination} from "./Destination";

export class Agency {
  name: string;
  address: string;
  founded_year: string;
  //logo: slika;
  phone_number: string;
  email: string;
  destinations: Destination[];

  constructor(agency: any) {
    this.name = agency.name;
    this.address = agency.address;
    this.founded_year = agency.founded_year;
    this.phone_number = agency.phone_number;
    this.email = agency.email;
    this.destinations = agency.destinations;
  }
}
