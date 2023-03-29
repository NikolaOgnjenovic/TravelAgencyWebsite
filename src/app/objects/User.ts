import {Destination} from "./Destination";

export class User {
  username: string;
  password: string;
  name: string;
  surname: string;
  email: string;
  birthday: Date;
  address: string;
  phoneNumber: number;
  id: number; // TODO: promeni na firebase ID
  static counter = 0; // zato sto system.time da isto vreme za moje hard-coded vrednosti

  constructor(user: any) {
    this.username = user.username;
    this.password = user.password;
    this.name = user.name;
    this.surname = user.surname;
    this.email = user.email;
    this.birthday = user.birthday;
    this.address = user.address;
    this.phoneNumber = user.phoneNumber;
    this.id = this.generateId();
  }
  generateId(): number {
    let newId = new Date().getTime() + User.counter;
    User.counter += 1000;
    return newId;
  }
}
