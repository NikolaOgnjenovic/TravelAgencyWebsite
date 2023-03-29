import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {User} from "../objects/User";

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
    if (!this.authService.login(this.loginForm.value)) {
      confirm("BAD LOGIN");
    } else {
      this.router.navigate(['home']);
    }
  }
}
