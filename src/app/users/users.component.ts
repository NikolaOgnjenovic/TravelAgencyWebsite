import { Component } from '@angular/core';
import {Destination} from "../objects/Destination";
import {Router} from "@angular/router";
import {AgencyService} from "../agency.service";
import {User} from "../objects/User";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: User[] = [];
  constructor(private router: Router, private agencyService: AgencyService) {
  }

  ngOnInit(): void {
    this.users = this.agencyService.getUsers();
  }

  editUser(user: User) {
    this.router.navigate(['edit_user'], {state: {user: user}});
  }
}
