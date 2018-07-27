import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor( private authService: AuthService ) { }

  ngOnInit() {
  }

  onSubmit() {
    const form = this.loginForm;
    this.authService.login(form.get('email').value, form.get('password').value).subscribe(res => {
      console.log(res);
    });
  }

}
