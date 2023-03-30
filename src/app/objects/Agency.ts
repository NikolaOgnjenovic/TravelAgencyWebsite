import {Destination} from "./Destination";

export class Agency {
  name: string;
  address: string;
  foundingYear: string;
  logo: string;
  phoneNumber: string;
  email: string;
  destinations: string;
  filteredDestinations: Destination[];
  id: string;

  constructor(agency: any) {
    this.name = agency.name;
    this.address = agency.address;
    this.foundingYear = agency.foundingYear;
    this.logo = agency.logo;
    this.phoneNumber = agency.phoneNumber;
    this.email = agency.email;
    this.destinations = agency.destinations;
    this.filteredDestinations = [];
    this.id = agency.id;
  }
}
