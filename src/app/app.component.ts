import {AfterContentChecked, Component} from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AgencyService} from "./agency.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './card.css', './validation.css']
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
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthday: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required)
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
      if (this.body != null) {
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
    if (!this.registrationForm.valid) {
      return;
    }

    let user = this.registrationForm.value;
    this.agencyService.addUser(user);
    this.authService.login({loginUsername: user.username, loginPassword: user.password});
    this.hideRegister();
  }
}
