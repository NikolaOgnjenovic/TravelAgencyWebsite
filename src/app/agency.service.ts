import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, remove, push} from "firebase/database";
import {Destination} from "./objects/Destination";
import {User} from "./objects/User";
import {Agency} from "./objects/Agency";


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

  private loadHardcodedData() {
    this.agencies.set("-MNQgy9N5foEWTmmA_1U", new Agency({
      name: "Aero-turs",
      address: "Obrenovićeva bb T.C. Gorča,Beograd,11000",
      foundingYear: "2011",
      logo: "https://i.imgur.com/OV15WM6.jpeg",
      phoneNumber: "011/7872-78423",
      email: "aero@mail.com",
      destinations: "-MNVEu6iMr2EFlQO6TW63"
    }));
    this.agencies.set("-MNQftJa4rskH-dBqE9Z", new Agency({
      name: "Air Serbia",
      address: " Bulevar umetnosti 16, Beograd, 11000",
      foundingYear: "2005",
      logo: "https://i.imgur.com/jsFrKCn.jpeg",
      phoneNumber: "011/3232-784323",
      email: "airserbia381@mail.com",
      destinations: "-MNVEu6iMr2EFlQO6TW60"
    }));
    this.agencies.set("-MNQg8Nd8YPRs-5Kbgqu", new Agency({
      name: "Bavka tours",
      address: "Gornji Bunibrod bb, Lazarevac, 16221 ",
      logo: "https://i.imgur.com/NhAzBBF.jpeg",
      foundingYear: "1990",
      phoneNumber: "022/9874-589545",
      email: "bavka@mail.com",
      destinations: "-MNVEu6iMr2EFlQO6TW61"
    }));
  }

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
    return agencies;
  }

  private updateDatabaseAgency(agencyId: string, agency: Agency): void {
    set(ref(this.realtimeDatabase, 'agencies/' + agencyId), {
      address: agency.address,
      destinations: agency.destinations,
      email: agency.email,
      foundingYear: agency.foundingYear,
      logo: agency.logo,
      name: agency.name,
      phoneNumber: agency.phoneNumber
    });
  }

  public addAgency(agency: Agency): void {
    agency.logo = "/assets/images/agency-placeholder.svg"

    // Create a new destination group on firebase and get the key
    push(ref(this.realtimeDatabase, 'destinations/')).then((dest_snap) => {
      let destinationGroupKey = dest_snap.key;
      if (destinationGroupKey != null) {
        agency.destinations = destinationGroupKey;
      }

      // Push the agency and get its' firebase reference
      push(ref(this.realtimeDatabase, 'agencies/'), agency).then((agency_snap) => {
          // Update agencies locally
          let key = agency_snap.key;
          if (key != null) {
            this.agencies.set(key, agency);
          }
      });
    });
  }

  private deleteDatabaseAgency(agencyId: string): void {
    remove(ref(this.realtimeDatabase, 'agencies/' + agencyId));
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
    return users;
  }

  private updateDatabaseUser(userId: string, user: User): void {
    set(ref(this.realtimeDatabase, 'users/' + userId), {
      address: user.address,
      birthday: user.birthday,
      email: user.email,
      name: user.name,
      password: user.password,
      phoneNumber: user.phoneNumber,
      surname: user.surname,
      username: user.username
    });
  }

  public addUser(user: User) {
    // Push the user and get its' firebase reference
    push(ref(this.realtimeDatabase, 'users/'), user).then((snapshot) => {
      let key = snapshot.key;
      if (key != null) {
        // Update users locally
        this.users.set(key, user);
      }
    });
  }

  private deleteDatabaseUser(userId: string): void {
    remove(ref(this.realtimeDatabase, 'users/' + userId));
  }

  // ------ AGENCIES -------
  getAgencies(): Map<string, Agency> {
    return this.agencies;
  }

  getAgency(agencyId: string) {
    return this.agencies.get(agencyId);
  }

  updateAgency(agency: Agency, agencyId: string, destinationGroupId: string) {
    agency.destinations = destinationGroupId; // The edit-destination component sends a DestinationForm without an id
    this.agencies.set(agencyId, agency);
    this.updateDatabaseAgency(agencyId, agency);
  }

  deleteAgency(agencyId: string) {
    this.agencies.delete(agencyId);
    this.deleteDatabaseAgency(agencyId);
  }

  // ------- DESTINATIONS -------
  getDestinations(): Map<string, Destination> {
    return this.destinations;
  }

  getDestination(destinationId: string): Destination | undefined {
    return this.destinations.get(destinationId);
  }

  addDestination(destination: Destination, destinationGroupId: string) {
    destination.destinationGroupId = destinationGroupId;
    destination.images = ["/assets/images/destination-placeholder.jpg", "/assets/images/people.png"];

    // Push the destination and get its' firebase reference
    push(ref(this.realtimeDatabase, 'destinations/' + destinationGroupId + '/'), destination)
      .then((snapshot) => {
      let key = snapshot.key;
      if (key != null) {
        // Update destinations locally
        this.destinations.set(key, destination);
      }
    });
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

  // ------ USERS ------
  updateUser(userId: string, user: User) {
    this.users.set(userId, user);
    this.updateDatabaseUser(userId, user);
  }

  deleteUser(userId: string) {
    this.users.delete(userId);
    this.deleteDatabaseUser(userId);
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
    return new Map<string, User>;
  }
}
