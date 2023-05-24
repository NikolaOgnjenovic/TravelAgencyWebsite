import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AgencyService} from "../agency.service";
import {User} from "../objects/User";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css', '../card.css']
})
export class UsersComponent {
  users: Map<string, User> = new Map<string, User>;
  constructor(private router: Router, agencyService: AgencyService) {
    this.users = agencyService.getUsers();
  }

  editUser(userId: string, user: User) {
    this.router.navigate(['edit_user'], {state: {userId: userId, user: user}});
  }
}
