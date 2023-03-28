import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  routes = [
    {linkName: "Home", url: "home"},
    /*
    {linkName: "Agency list", url: "agencies"},
    {linkName: "destination", url: "destination"},
    {linkName: "Edit destination", url: "edit_destination"},
    {linkName: "Edit agencies", url: "edit_agencies"},
    */
    {linkName: "Edit user", url: "edit_user"},
    {linkName: "Login", url: "login"},
    {linkName: "Register", url: "register"},
  ]
}
