import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../../_services/auth.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Create Login Controls
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  hidePassword = true;
  error: string;

  constructor(private _authService: AuthService, private _dialogRef: MatDialogRef<LoginComponent>) {
  }

  ngOnInit() {
  }

  login(): void {
    if (this.email.valid && this.password.valid) {
      this._authService.emailLogin(this.email.value, this.password.value)
        .then(() => {
          this._dialogRef.close();
        })
        .catch((error: any) => {
          this.error = error;
        });
    } else {
      this.email.markAsTouched();
      this.password.markAsTouched();
    }
  }

  getEmailErrorMsg(): string {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMsg(): string {
    return this.password.hasError('required') ? 'You must enter a value' : '';
  }

}
