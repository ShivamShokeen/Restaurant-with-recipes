import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  usersAccount = [
    {
      id : 1,
      name : "Shivam"
    },
    {
      id : 2,
      name: "Manish"
    },
    {
      id : 3,
      name:"Abhishek"
    }
  ]

  constructor() { }

  ngOnInit() {}



}
