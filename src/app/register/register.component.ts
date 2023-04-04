import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AgencyService} from "../agency.service";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationForm: FormGroup;
  constructor(private router: Router, private agencyService: AgencyService, private authService: AuthService) {
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
  registerUser() {
    let user = this.registrationForm.value;
    if (user.name.length < 1) {
      return;
    }
    if (!this.agencyService.validateUserForm(this.registrationForm.value)) {
      alert("bad register");
      return;
    }
    this.agencyService.addUser(user);
    this.authService.login(user);
    this.router.navigate(['home']);
  }
}
