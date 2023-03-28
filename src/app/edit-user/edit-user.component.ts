import { Component } from '@angular/core';
import {Destination} from "../objects/Destination";
import {Form, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AgencyService} from "../agency.service";
import {User} from "../objects/User";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  user: User;
  userForm: FormGroup;
  constructor(private router: Router, private agencyService: AgencyService) {
    const routerExtras = this.router.getCurrentNavigation()?.extras.state
    this.user = routerExtras?.['user'];
    this.userForm = new FormGroup({
      username: new FormControl(this.user.username),
      password: new FormControl(this.user.password),
      name: new FormControl(this.user.name),
      surname: new FormControl(this.user.surname),
      email: new FormControl(this.user.email),
      birthday: new FormControl(this.user.birthday),
      address: new FormControl(this.user.address),
      phoneNumber: new FormControl(this.user.phoneNumber)
    });
  }

  deleteUser() {
    if (!confirm("Are you sure that you want to delete this user?")) {
      console.log("Denied");
    } else {
      this.agencyService.deleteUser(this.user.id);
      this.router.navigate(['users']);
    }
  }

  updateUser() {
    if (!confirm("Are you sure that you want to update this user?")) {
      console.log("Denied");
    } else {
      this.agencyService.updateUser(this.userForm.value, this.user.id);
      this.router.navigate(['users']);
    }
  }
}
