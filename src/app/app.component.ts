import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth';
import { User } from './models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  authUser: User;

  constructor ( private authService: AuthService, private router: Router ) {}

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.authUser = user;
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }

}
