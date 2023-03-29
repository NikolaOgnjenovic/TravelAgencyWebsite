import { Injectable } from '@angular/core';
import {AgencyService} from "./agency.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private agencyService: AgencyService) {}

  // TODO: token?
  static isAdmin: boolean = false;
  static loggedIn: boolean = false;
  static userId: number;
  login(auth: any): boolean {
    // TODO: find a different way to handle logging in (listing all users without needing to be admin)!!!
    AuthService.isAdmin = true;
    let login_successful = this.agencyService.getUsers().some(u => u.username == auth.username && u.password == auth.password);
    AuthService.isAdmin = false;
    if (!login_successful) {
      return false;
    }
    AuthService.isAdmin = auth.username == "admin";
    AuthService.loggedIn = true;
    let id = this.agencyService.getLoggedInUserId(auth.username);
    console.log("USERNAME: " + auth.username);
    if (id == undefined) {
      return false;
    }
    AuthService.userId = id;
    return true;
  }

  logout() {
    AuthService.isAdmin = false;
    AuthService.loggedIn = false;
    AuthService.userId = -1;
  }
}
