import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';

import { AuthService } from '../../../services/auth';
import { UserService } from '../../../services/user';
import { ServerErrorComponent } from '../../../dialogs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  isNew: boolean;
  token: string;
  isValid = true;
  mode: 'request' | 'reset' | 'request-complete' | 'reset-complete';

  resetPasswordForm = new FormGroup({
    password: new FormControl('', [Validators.required, this.passwordRulesValidator()]),
    repeatPassword: new FormControl('', this.matchesValidator('password'))
  });

  resendLinkForm = new FormGroup({
    email: new FormControl('')
  });

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private userService: UserService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.get('token')) {
        this.mode = 'request';
      } else {
        this.isNew = paramMap.get('new') === 'first';
        this.authService.isValidResetToken(paramMap.get('token')).subscribe(isValid => {
          if (isValid) {
            this.mode = 'reset';
            this.token = paramMap.get('token');
          } else {
            this.mode = 'request';
            this.isValid = false;
          }
        });
      }
    });
  }

  requestReset() {
    this.userService.requestReset(this.resendLinkForm.get('email').value).subscribe(() => {
      this.mode = 'request-complete';
    }, error => {
      const dialogRef = this.dialog.open(ServerErrorComponent);
    });
  }

  resetPassword() {
    this.validatePasswordForm();
    if (this.resetPasswordForm.valid) {
      this.userService.resetPassword(this.token, this.resetPasswordForm.get('password').value).subscribe(res => {
        if (res) {
          this.router.navigate(['auth/login/true']);
        } else {
          console.log('No :(');
        }
      });
    }
  }

  validatePasswordForm() {
    for (const field in this.resetPasswordForm.controls) {
      const control = this.resetPasswordForm.get(field);
      control.markAsTouched();
      control.updateValueAndValidity();
    }
  }

  errorMessage(fieldName: string): string {
    const control = this.resetPasswordForm.get(fieldName);
    if (control.hasError('required')) {
      return 'Required';
    } else if (control.hasError('matches' )) {
      return 'Passwords must match';
    } else if (control.hasError( 'passwordRules' )) {
      return 'Passwords must be at least 8 characters long';
    } else {
      return '';
    }
  }

  resendLink() {}

  passwordRulesValidator() {
    return (control: FormControl) => {
      if (control.value.length < 8) {
        return {
          passwordRules: true
        };
      }
      return null;
    };
  }

  matchesValidator(controlToMatchName: string) {
    let controlToTest: FormControl;
    let controlToMatch: FormControl;

    return (control: FormControl) => {
      if (!control.parent) {
        return null;
      }

      if (!controlToTest) {
        controlToTest = control;
        controlToMatch = control.parent.get(controlToMatchName) as FormControl;
        if (!controlToMatch) {
          throw new Error('matchesValidator(): control to match not found in parent group');
        }
      }

      if (controlToMatch.value !== controlToTest.value) {
        return {
          matches: true
        };
      }

      return null;

    };
  }

}
