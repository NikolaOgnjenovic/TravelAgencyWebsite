import {AfterContentChecked, Component} from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {AgencyService} from "./agency.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './card.css', './margins.css']
})
export class AppComponent implements AfterContentChecked{
  loggedIn: boolean = AuthService.loggedIn;
  loginForm: FormGroup;
  loginPopup: HTMLElement | null = null;
  registrationForm: FormGroup;
  registrationPopup: HTMLElement | null = null;
  body: HTMLElement | null = null;
  constructor(private router: Router, private authService: AuthService, private agencyService: AgencyService) {
    this.loginForm = new FormGroup({
      loginUsername: new FormControl(),
      loginPassword: new FormControl(),
    });
    this.registrationForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      name: new FormControl(),
      surname: new FormControl(),
      email: new FormControl(),
      birthday: new FormControl(),
      address: new FormControl(),
      phoneNumber: new FormControl()
    });
  }
  ngAfterContentChecked() {
    this.loggedIn = AuthService.loggedIn;
    this.loginPopup = document.getElementById("loginPopup");
    this.registrationPopup = document.getElementById("registrationPopup");
    this.body = document.getElementById("app");
  }

  showLogin() {
    if (this.loginPopup != null) {
      this.loginPopup.style.display = "block";
      ("SHOW LOGIN");
      if (this.body != null) {
        ("BODY NOT NULL");
        this.body.classList.add("blur");
        this.body.style.pointerEvents = "none";
      }
    }
  }

  hideLogin() {
    if (this.loginPopup != null) {
      this.loginPopup.style.display = "none";
      if (this.body != null) {
        this.body.classList.remove("blur");
        this.body.style.pointerEvents = "auto";
      }
    }
  }

  login() {
    if (this.loginForm.value.loginUsername.length < 1 || this.loginForm.value.loginPassword.length < 1) {
      return;
    }
    if (!this.authService.login(this.loginForm.value)) {
      return;
    }
    this.hideLogin();
  }

  logout() {
    AuthService.logout();
    this.router.navigate(['home']);
  }

  showRegister() {
    if (this.registrationPopup != null) {
      this.registrationPopup.style.display = "block";
      if (this.body != null) {
        this.body.classList.add("blur");
        this.body.style.pointerEvents = "none";
      }
    }
  }

  hideRegister() {
    if (this.registrationPopup != null) {
      this.registrationPopup.style.display = "none";
      if (this.body != null) {
        this.body.classList.remove("blur");
        this.body.style.pointerEvents = "auto";
      }
    }
  }
  registerUser() {
    let user = this.registrationForm.value;
    if (user.name.length < 1) {
      return;
    }
    if (!this.agencyService.validateUserForm(this.registrationForm.value)) {
      return;
    }
    this.agencyService.addUser(user);
    this.authService.login(user);
    this.router.navigate(['home']);
    this.hideRegister();
  }
}
