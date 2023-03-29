import {AfterContentChecked, AfterContentInit, Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentChecked{
  routes = [
    {linkName: "Home", url: "home"},
    {linkName: "Users", url: "users"}
  ];

  constructor(private authService: AuthService) {

  }
  loggedIn: boolean = AuthService.loggedIn;

  ngAfterContentChecked() {
    this.loggedIn = AuthService.loggedIn;
  }

  logout() {
    this.authService.logout();
  }
}
