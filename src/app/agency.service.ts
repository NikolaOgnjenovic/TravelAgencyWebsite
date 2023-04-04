import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue} from "firebase/database";
import {Destination} from "./objects/Destination";
import {User} from "./objects/User";
import {Agency} from "./objects/Agency";
import firebase from "firebase/compat";


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

  private agencies: Map<string, Agency> = new Map<string, Agency>;
  private destinations: Map<string, Destination> = new Map<string, Destination>;
  private users: Map<string, User> = new Map<string, User>;
  constructor() {
    this.firebase = initializeApp(this.firebaseConfig);
    this.realtimeDatabase = getDatabase(this.firebase);
    //this.loadHardcodedData();
    this.loadFirebaseData();
  }

  // private loadHardcodedData() {
  //   this.agencies.push(
  //     new Agency(
  //       {
  //         name: "Mrmi travel",
  //         address: "2023",
  //         foundingYear: 2023,
  //         phoneNumber: "+38166",
  //         email: "email@email.com",
  //         destinations: [
  //           new Destination({
  //             name: "Prag",
  //             description: "Putovanje u Prag",
  //             //photos: slika[];
  //             type: "Letovanje", // Letovanje, zimovanje, gradovi Evrope
  //             transport: "Avionom", // avion, autobus, sopstveni prevoz
  //             price: 100,
  //             capacity: 40, // max broj osoba
  //           }),
  //           new Destination({
  //             name: "Ljubljana",
  //             description: "Putovanje u Ljubljanu",
  //             //photos: slika[];
  //             type: "Letovanje", // Letovanje, zimovanje, gradovi Evrope
  //             transport: "Autobusom", // avion, autobus, sopstveni prevoz
  //             price: 200,
  //             capacity: 50, // max broj osoba
  //           })
  //         ]}
  //     ),
  //     new Agency(
  //       {
  //         name: "Marina travel",
  //         address: "adrs",
  //         foundingYear: 2021,
  //         phoneNumber: "+38165",
  //         email: "email@email.com",
  //         destinations: [
  //           new Destination({
  //             name: "Prag",
  //             description: "Putovanje u Prag",
  //             images: [],
  //             type: "Letovanje", // Letovanje, zimovanje, gradovi Evrope
  //             transport: "Avionom", // avion, autobus, sopstveni prevoz
  //             price: 100,
  //             capacity: 40, // max broj osoba
  //           }),
  //           new Destination({
  //             name: "Ljubljana",
  //             description: "Putovanje u Ljubljanu",
  //             images: [],
  //             type: "Letovanje", // Letovanje, zimovanje, gradovi Evrope
  //             transport: "Autobusom", // avion, autobus, sopstveni prevoz
  //             price: 200,
  //             capacity: 50, // max broj osoba
  //           })
  //         ]}
  //     ));
  //
  //   this.users.push(new User({
  //     username: 'admin',
  //     password: 'admin',
  //     name: 'a',
  //     surname: 'a',
  //     email: 'a',
  //     birthday: new Date(),
  //     address: 'a',
  //     phoneNumber: 'a'
  //   }));
  //   this.users.push(new User({
  //     username: 'user',
  //     password: '1234',
  //     name: 'b',
  //     surname: 'b',
  //     email: 'b',
  //     birthday: new Date(),
  //     address: 'b'
  //   }));
  // }

  // ------- FIREBASE -------
  private loadFirebaseData() {
    this.agencies = this.getDatabaseAgencies();
    this.destinations = this.getDatabaseDestinations();
    this.users = this.getDatabaseUsers();
  }

  private getDatabaseAgencies(): Map<string, Agency> {
    let agencies: Map<string, Agency> = new Map<string, Agency>;
    const agenciesRef = ref(this.realtimeDatabase, 'agencies/');
    onValue(agenciesRef, (snapshot) => {
      snapshot.forEach((child) => {
        if (child.key != null) {
          agencies.set(child.key, child.val());
        }
      });
    });
    console.log("\nAGENCIES:");
    console.table(agencies);
    return agencies;
  }

  private getDatabaseDestinations(): Map<string, Destination> {
    let destinations: Map<string, Destination> = new Map<string, Destination>;
    const destinationsRef = ref(this.realtimeDatabase, 'destinations/');
    onValue(destinationsRef, (snapshot) => {
      snapshot.forEach((destinationGroup) => {
        destinationGroup.forEach((destination) => {
          let d: Destination = destination.val();
          if (destinationGroup.key != null) {
            d.destinationGroupId = destinationGroup.key;
          }
          if (destination.key != null) {
            destinations.set(destination.key, d);
          }
        })
      })
    });
    console.log("\nDESTINATIONS:");
    console.table(destinations);
    return destinations;
  }

  private getDatabaseUsers(): Map<string, User> {
    let users: Map<string, User> = new Map<string, User>;
    const usersRef = ref(this.realtimeDatabase, 'users/');
    onValue(usersRef, (snapshot) => {
      snapshot.forEach((child) => {
        if (child.key != null) {
          users.set(child.key, child.val());
        }
      });
    });
    console.log("\nUSERS:");
    console.table(users);
    return users;
  }

  // ------ AGENCIES -------
  getAgencies(): Map<string, Agency> {
    return this.agencies;
  }

  getAgency(agencyId: string) {
    return this.agencies.get(agencyId);
  }


  // TODO: Update / remove from database
  updateAgency(agency: Agency, agencyId: string, destinationGroupId: string, agencyLogo: string) {
    // The edit-destination component sends a DestinationForm without an id
    agency.destinations = destinationGroupId;
    agency.logo = agencyLogo;
    this.agencies.set(agencyId, agency);
  }

  deleteAgency(agencyId: string) {
    this.agencies.delete(agencyId);
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
  getDestinations(): Map<string, Destination> {
    return this.destinations;
  }

  getDestination(destinationId: string): Destination | undefined {
    return this.destinations.get(destinationId);
}
  getDestinationsByGroupId(destinationGroupId: string): Map<string, Destination> {
    let groupedDestinations: Map<string, Destination> = new Map<string, Destination>;
    for (let [key, value] of this.destinations) {
      if (value.destinationGroupId == destinationGroupId) {
        groupedDestinations.set(key, value);
      }
    }
    return groupedDestinations;
  }

  updateDestination(destination: Destination, destinationId: string, destinationGroupId: string, destinationImages: string[]) {
    destination.destinationGroupId = destinationGroupId;
    destination.images = destinationImages;
    this.destinations.set(destinationId, destination);
  }

  deleteDestination(destinationId: string) {
    this.destinations.delete(destinationId);
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
  updateUser(userId: string, user: User) {
    this.users.set(userId, user);
  }

  deleteUser(userId: string) {
    this.users.delete(userId);
  }

  addUser(user: User) {
    this.users.set(new Date().getDate().toString(), user);
  }

  getLoggedInUserId(username: string): string | null {
    let userId = "";
    this.users.forEach((value, key) => {
      if (value.username == username) {
        userId = key;
      }
    });
    return userId;
  }

  private getLoggedInUser(): User | undefined {
    return this.users.get(AuthService.userId);
  }

  getUsers(): Map<string, User> {
    if (AuthService.isAdmin) {
      return this.users;
    }
    let user = this.getLoggedInUser();
    if (user != null) {
      let userMap = new Map<string, User>
      userMap.set(AuthService.userId, user);
      return userMap
    }

    if (user == undefined) {
      return new Map<string, User>;
    }
    return user;
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
