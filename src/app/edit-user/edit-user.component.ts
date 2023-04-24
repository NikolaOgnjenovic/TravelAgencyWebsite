import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AgencyService} from "../agency.service";
import {User} from "../objects/User";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css', '../validation.css', '../card.css']
})
export class EditUserComponent {
  userId: string;
  user: User;
  userForm: FormGroup;
  constructor(private router: Router, private agencyService: AgencyService) {
    const routerExtras = this.router.getCurrentNavigation()?.extras.state;
    this.userId = routerExtras?.['userId'];
    this.user = routerExtras?.['user'];
    this.userForm = new FormGroup({
      username: new FormControl(this.user.username, Validators.required),
      password: new FormControl(this.user.password, Validators.required),
      name: new FormControl(this.user.name, Validators.required),
      surname: new FormControl(this.user.surname, Validators.required),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      birthday: new FormControl(this.user.birthday, Validators.required),
      address: new FormControl(this.user.address, Validators.required),
      phoneNumber: new FormControl(this.user.phoneNumber, Validators.required)
    });
  }

  deleteUser() {
    if (!confirm("Are you sure that you want to delete this user?")) {
      return;
    }
    this.agencyService.deleteUser(this.userId);
    this.router.navigate(['users']);
  }

  updateUser() {
    if (!confirm("Are you sure that you want to update this user?")) {
      return;
    }

    if (this.userForm.valid) {
      this.agencyService.updateUser(this.userId, this.userForm.value);
      this.router.navigate(['users']);
    }
  }
}
