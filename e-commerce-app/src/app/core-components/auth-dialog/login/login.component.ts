import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

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

  constructor() {
  }

  ngOnInit() {
  }

  login(): void {
    if (this.email.valid && this.password.valid) {
    } else {
      this.email.markAsTouched();
      this.password.markAsTouched();
    }
  }

  getErrorMessage(): string {
    return (this.email.hasError('required') || this.password.hasError('required')) ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
