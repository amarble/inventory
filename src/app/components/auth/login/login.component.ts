import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../services/auth';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    remember: new FormControl(false)
  });

  loginError = 0;
  reset = false;

  constructor( private authService: AuthService,
               private route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.get('reset')) {
        this.reset = true;
      }
    });
  }

  onSubmit() {
    const form = this.loginForm;
    this.authService.login(form.get('email').value, form.get('password').value).subscribe(res => {
      console.log(res);
    }, error => {
      switch (error.status) {
        case 401:
          this.loginError = error.status;
          break;
        default:
          this.loginError = -1;
      }
    });
  }

}
