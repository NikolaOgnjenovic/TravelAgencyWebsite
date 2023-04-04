import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private router: Router, private authService: AuthService) {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }
  login() {
    if (this.loginForm.value.username.length < 1 || this.loginForm.value.password.length < 1) {
      alert("bad form");
      return;
    }
    if (!this.authService.login(this.loginForm.value)) {
      alert("BAD LOGIN");
      return;
    }
    this.router.navigate(['home']);
    }
}
