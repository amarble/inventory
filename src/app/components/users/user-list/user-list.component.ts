import { Component, OnInit } from '@angular/core';

import { User } from '../../../models/user';
import { UserService } from '../../../services/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAll().subscribe(users => {
      this.users = users;
      console.log('USERS', users);
    });
  }

}
