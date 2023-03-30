import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue} from "firebase/database";
import {Destination} from "./objects/Destination";
import {User} from "./objects/User";
import {Agency} from "./objects/Agency";
import {FormGroup} from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class AgencyService {
  firebaseConfig = {
    apiKey: "AIzaSyAt_PKPZxWswHK2KEq15oS1IixzjiJLVDE",

    authDomain: "travelagency-4a308.firebaseapp.com",

    projectId: "travelagency-4a308",

    storageBucket: "travelagency-4a308.appspot.com",

    messagingSenderId: "556550710811",

    appId: "1:556550710811:web:dfd5606a6acfd040a63abe",

    databaseURL: "https://travelagency-4a308-default-rtdb.europe-west1.firebasedatabase.app/"
  };
  firebase: any;
  realtimeDatabase: any;

  private agencies: Agency[] = [];
  private users: User[] = [];
  private destinations: Destination[] = [];

  constructor() {
    this.firebase = initializeApp(this.firebaseConfig);
    this.realtimeDatabase = getDatabase(this.firebase);
    //this.loadHardcodedData();
    this.loadFirebaseData();
  }

  private loadHardcodedData() {
    this.agencies.push(
      new Agency(
        {
          name: "Mrmi travel",
          address: "2023",
          foundingYear: 2023,
          phoneNumber: "+38166",
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
          foundingYear: 2021,
          phoneNumber: "+38165",
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

    this.users.push(new User({
      username: 'admin',
      password: 'admin',
      name: 'a',
      surname: 'a',
      email: 'a',
      birthday: new Date(),
      address: 'a',
      phoneNumber: 'a'
    }));
    this.users.push(new User({
      username: 'user',
      password: '1234',
      name: 'b',
      surname: 'b',
      email: 'b',
      birthday: new Date(),
      address: 'b'
    }));
  }

  // ------- FIREBASE -------
  private loadFirebaseData() {
    this.agencies = this.getDatabaseAgencies();
    this.destinations = this.getDatabaseDestinations();
    this.users = this.getDatabaseUsers();
  }

  private getDatabaseAgencies(): any[] {
    let agencies: any[] = [];
    const agenciesRef = ref(this.realtimeDatabase, 'agencies/');
    onValue(agenciesRef, (snapshot) => {
      snapshot.forEach((child) => {
        let a: Agency = child.val();
        if (child.key != null) {
          a.id = child.key;
        }
        agencies.push(a);
      });
    });
    console.log("\nAGENCIES:");
    console.table(agencies);
    return agencies;
  }

  private getDatabaseDestinations(): any[] {
    let destinations: Destination[] = [];
    const destinationsRef = ref(this.realtimeDatabase, 'destinations/');
    onValue(destinationsRef, (snapshot) => {
      snapshot.forEach((destinationGroup) => {
        destinationGroup.forEach((destination) => {
          let d: Destination = destination.val();
          if (destination.key != null) {
            d.id = destination.key;
            if (destinationGroup.key != null) {
              d.destinationGroupId = destinationGroup.key;
            }
          }
          destinations.push(d);
        })
      })
    });
    console.log("\nDESTINATIONS:");
    console.table(destinations);
    return destinations;
  }

  private getDatabaseUsers(): any[] {
    let users: any[] = [];
    const usersRef = ref(this.realtimeDatabase, 'users/');
    onValue(usersRef, (snapshot) => {
      snapshot.forEach((child) => {
        let u: Agency = child.val();
        if (child.key != null) {
          u.id = child.key;
        }
        users.push(u);
      });
    });
    console.log("\nUSERS:");
    console.table(users);
    return users;
  }
  getAgencies(): Agency[] {
    return this.agencies;
  }

  // ------ AGENCIES -------
  getAgencyNameByAgencyId(agencyId: string): string {
    return this.agencies[this.getAgencyIndex(agencyId)].name;
  }

  private getAgencyIndex(agencyId: string) {
    return this.agencies.findIndex(a => a.id == agencyId);
  }

  // TODO: Update / remove from database
  updateAgency(agency: Agency, agencyId: string, destinationGroupId: string, agencyLogo: string) {
    let agencyIndex = this.getAgencyIndex(agencyId);
    if (agencyIndex == -1) {
      return;
    }
    // The edit-destination component sends a DestinationForm without an id
    agency.id = agencyId;
    agency.destinations = destinationGroupId;
    agency.logo = agencyLogo;
    this.agencies[agencyIndex] = agency;
  }

  deleteAgency(agencyId: string) {
    let agencyIndex = this.getAgencyIndex(agencyId);
    if (agencyIndex == -1) {
      return;
    }
    this.agencies.splice(agencyIndex, 1);
  }

  validateAgencyForm(value: any): boolean {
    if (value.name.length < 1) {
      console.log("Empty name");
      return false;
    }

    if (value.address.length < 1) {
      console.log("Empty address");
      return false;
    }

    if (!/([0-9]+$)/g.test(value.foundingYear)) {
      console.log("year: " + value.foundingYear + " type: " + typeof(value.foundingYear));
      console.log("Founding year not integer");
      return false;
    }

    if (!/([0-9]+)+\/([0-9]+)-([0-9]+)$/g.test(value.phoneNumber)) {
      console.log("Phone number not valid");
      return false;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value.email)) {
      console.log("Invalid email");
      return false;
    }
    return true;
  }

  // ------- DESTINATIONS -------
  getDestinations() {
    return this.destinations;
  }

  getDestinationsByGroupId(destinationGroupId: string): Destination[] {
    let destinations: Destination[];
    destinations = this.destinations.filter(dest => dest.destinationGroupId == destinationGroupId);
    return destinations;
  }

  private getDestinationIndex(destinationId: string): number {
    return this.destinations.findIndex(d => d.id == destinationId);
  }

  updateDestination(destination: Destination, destinationId: string, destinationGroupId: string, destinationImages: string[]) {
    let destinationIndex = this.getDestinationIndex(destinationId);
    if (destinationIndex == -1) {
      return;
    }
    destination.id = destinationId; // The edit-destination component sends a DestinationForm without an id
    destination.destinationGroupId = destinationGroupId;
    destination.images = destinationImages;
    this.destinations[destinationIndex] = destination;
  }

  deleteDestination(destinationId: string) {
    let destinationIndex = this.getDestinationIndex(destinationId);
    if (destinationIndex == -1) {
      return;
    }
    this.destinations.splice(destinationIndex, 1);
  }

  validateDestinationForm(value: any): boolean {
    if (value.name.length < 1) {
      console.log("Empty name");
      return false;
    }

    if (value.description.length < 1) {
      console.log("Empty description");
      return false;
    }

    if (value.type.length < 1) {
      console.log("Empty type");
      return false;
    }

    if (value.transport.length < 1) {
      console.log("Empty transport");
      return false;
    }

    if (!/([0-9]+$)/g.test(value.price)) {
      console.log("Invalid price");
      return false;
    }

    if (!/([0-9]+$)/g.test(value.capacity)) {
      console.log("Invalid capacity");
      return false;
    }
    return true;
  }

  // ------ USERS ------
  private getUserIndex(userId: string) {
    return this.users.findIndex(u => u.id == userId);
  }
  updateUser(user: User, userId: string) {
    let userIndex = this.getUserIndex(userId);
    if (userIndex == -1) {
      return;
    }
    user.id = userId; // The edit-destination component sends a DestinationForm without an id
    this.users[userIndex] = user;
  }

  deleteUser(userId: string) {
    let userIndex = this.getUserIndex(userId);
    if (userIndex == -1) {
      return;
    }
    this.users.splice(userIndex, 1);
  }

  saveUser(user: User) {
    this.users.push(user);
  }

  getLoggedInUserId(username: string): string | null {
    let userId = "";
    this.users.forEach(u => {
      if (u.username == username) {
        userId = u.id;
      }
    });
    return userId;
  }

  private getLoggedInUser() {
    let user = null;
    this.users.forEach(u => {
      if (u.id == AuthService.userId) {
        user = u;
      }
    })
    return user;
  }

  getUsers(): User[] {
    if (AuthService.isAdmin) {
      return this.users;
    }
    let user = this.getLoggedInUser();
    if (user != null) {
      return [user];
    }
    return [];
  }

  validateUserForm(value: any): boolean {
    if (value.username.length < 1) {
      console.log("Empty name");
      return false;
    }

    if (value.password.length < 1) {
      console.log("Empty address");
      return false;
    }

    if (value.name.length < 1) {
      console.log("Empty address");
      return false;
    }

    if (value.surname.length < 1) {
      console.log("Empty address");
      return false;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value.email)) {
      console.log("Invalid email");
      return false;
    }

    if (value.address.length < 1) {
      console.log("Empty address");
      return false;
    }

    if (!/[0-9]+$/g.test(value.phoneNumber)) {
      console.log("Empty address");
      return false;
    }

    return true;
  }
}
