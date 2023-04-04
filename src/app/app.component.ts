import {AfterContentChecked, Component} from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentChecked{
  loggedIn: boolean = AuthService.loggedIn;

  constructor(private router: Router) {

  }
  ngAfterContentChecked() {
    this.loggedIn = AuthService.loggedIn;
  }

  logout() {
    AuthService.logout();
    this.router.navigate(['home']);
  }
}
