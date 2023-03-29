import {AfterContentChecked, AfterContentInit, Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentChecked{
  loggedIn: boolean = AuthService.loggedIn;

  ngAfterContentChecked() {
    this.loggedIn = AuthService.loggedIn;
  }

  logout() {
    AuthService.logout();
  }
}
