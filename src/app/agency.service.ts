import {Injectable} from '@angular/core';
import {Agency} from "./objects/Agency";
import {Destination} from "./objects/Destination";
import {User} from "./objects/User";
import {AuthService} from "./auth.service";
//import { initializeApp } from 'firebase/app';
//import { getFirestore, collection, getDocs, Firestore} from 'firebase/firestore/lite';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue} from "firebase/database";
import {FirebaseAgency} from "./objects/FirebaseAgency";
import {FirebaseDestination} from "./objects/FirebaseDestination";


@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  private agencies: Agency[] = [];
  private users: User[] = [];

  // TODO: Replace the following with your app's Firebase project configuration
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

  constructor() {
    this.firebase = initializeApp(this.firebaseConfig);
    this.realtimeDatabase = getDatabase(this.firebase);
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

    this.getDatabaseAgencies();
    this.getDatabaseDestinations();
    this.getDatabaseUsers();
  }

  private getDatabaseAgencies(): any[] {
    let agencies: any[] = [];
    const agenciesRef = ref(this.realtimeDatabase, 'agencies/');
    onValue(agenciesRef, (snapshot) => {
      snapshot.forEach((child) => {
        let a: FirebaseAgency = child.val();
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
    let destinations: FirebaseDestination[] = [];
    const destinationsRef = ref(this.realtimeDatabase, 'destinations/');
    onValue(destinationsRef, (snapshot) => {
      snapshot.forEach((destinationGroup) => {
        destinationGroup.forEach((destination) => {
          let d: FirebaseDestination = destination.val();
          if (destination.key != null) {
            d.id = destination.key;
            d.destinationGroupId = destinationGroup.key;
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
        let u: FirebaseAgency = child.val();
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

  getDestinations(agencyId: number): Destination[] {
    return this.agencies[this.getAgencyIndex(agencyId)].destinations;
  }

  getAllDestinations(): Destination[] {
    let destinations: Destination[] = [];
    this.agencies.forEach((a) => a.destinations.forEach((d) => destinations.push(d)));
    return destinations;
  }

  getUsers(): User[] {
    if (AuthService.isAdmin) {
      return this.users;
    }
    let user = this.getCurrentUser();
    console.log("CURRENT USER");
    console.table(user);
    if (user != null) {
      return [user];
    }
    return [];
  }

  private getCurrentUser() {
    console.log("Service id: " + AuthService.userId);
    let user = null;
    this.users.forEach(u => {
      if (u.id == AuthService.userId) {
        user = u;
      }
    })
    return user;

    //users.find je problem? citaj dokumentaciju. 02:47 je. bolje ostavi
    //return this.users.find(u => u.id = AuthService.userId);
  }

  getAgencyName(agencyId: number): string {
    return this.agencies[this.getAgencyIndex(agencyId)].name;
  }

  private getDestinationIndex(destination: Destination, agencyId: number): number {
    return this.getDestinations(agencyId).findIndex(d => d.id == destination.id);
  }

  updateDestination(destination: Destination, agencyId: number, destinationId: number) {
    let destinationIndex = this.getDestinationIndex(destination, agencyId);
    if (destinationIndex == -1) {
      return;
    }
    destination.id = destinationId; // The edit-destination component sends a DestinationForm without an ida
    this.getDestinations(agencyId)[destinationIndex] = destination;
  }

  deleteDestination(destination: Destination, agencyId: number) {
    let destinationIndex = this.getDestinationIndex(destination, agencyId);
    if (destinationIndex == -1) {
      return;
    }
    this.getDestinations(agencyId).splice(destinationIndex, 1);
  }

  private getAgencyIndex(agencyId: number) {
    return this.agencies.findIndex(a => a.id == agencyId);
  }

  updateAgency(agency: Agency, agencyId: number, destinations: Destination[]) {
    let agencyIndex = this.getAgencyIndex(agencyId);
    if (agencyIndex == -1) {
      return;
    }
    agency.id = agencyId;
    agency.destinations = destinations;
    this.agencies[agencyIndex] = agency;
  }

  deleteAgency(agencyId: number) {
    let agencyIndex = this.getAgencyIndex(agencyId);
    if (agencyIndex == -1) {
      return;
    }
    this.agencies.splice(agencyIndex, 1);
  }

  private getUserIndex(userId: number) {
    return this.users.findIndex(u => u.id == userId);
  }
  updateUser(user: User, userId: number) {
    let userIndex = this.getUserIndex(userId);
    if (userIndex == -1) {
      return;
    }
    user.id = userId;
    this.users[userIndex] = user;
  }

  deleteUser(userId: number) {
    let userIndex = this.getUserIndex(userId);
    if (userIndex == -1) {
      return;
    }
    this.users.splice(userIndex, 1);
  }

  saveUser(user: User) {
    this.users.push(user);
  }

  getLoggedInUserId(username: string) {
    console.table(this.users);
    console.log("agency username: " + username);
    let userId = -1;
    this.users.forEach(u => {
      console.log(u.username == username);
      if (u.username == username) {
        console.log("yes, " + u.id);
        userId = u.id;
      }
    });
    return userId;
    //console.log(this.users.find(u => u.username == username));
    //return this.users.find(u => u.username == username)?.id;
  }
}
