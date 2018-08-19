import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { User } from '../../../models/user';
import { UserLevel } from '../../../models/userLevel';

import { UserService } from '../../../services/user';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  newRegLink: string; // @TODO remove once server email is in place

  userLevels: UserLevel[];
  userId: string;
  userForm = new FormGroup({
    email: new FormControl({value: null, disabled: true}),
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private authService: AuthService,
              private snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id') || '';
    });
    this.authService.user.subscribe(authUser => {
      this.userForm.patchValue({
        email: authUser.email,
        firstName: authUser.name.first,
        lastName: authUser.name.last
      });
    });
  }

  save() {
    const user = new User();
    Object.assign(user, {
      email: this.userForm.get('email').value,
      name: {
        first: this.userForm.get('firstName').value,
        last: this.userForm.get('lastName').value
      }
    });
    this.userService.update(user).subscribe(result => {
      this.authService.user.next(user);
      this.snackBar.open('Account details updated', null, {duration: 2000} );
    }, () => {
      this.snackBar.open('There was a problem updating your information', null, {duration: 5000});
    });
  }

}
