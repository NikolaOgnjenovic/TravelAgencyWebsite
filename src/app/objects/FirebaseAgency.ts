import {Destination} from "./Destination";

export class FirebaseAgency {
  name: string;
  address: string;
  founded_year: string;
  photos: string[];
  phone_number: string;
  email: string;
  destinations: string;
  filteredDestinations: Destination[];
  id: string | null;

  constructor(agency: any) {
    this.name = agency.name;
    this.address = agency.address;
    this.founded_year = agency.founded_year;
    this.photos = agency.photos;
    this.phone_number = agency.phone_number;
    this.email = agency.email;
    this.destinations = agency.destinations;
    this.filteredDestinations = [];
    this.id = agency.id;
  }
}
