import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validator, Validators} from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // Create Register Controls
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('');

  hidePassword = true;


  constructor() {
  }


  ngOnInit() {

  }

  getNameErrorMsg(): string {
    return this.name.hasError('required') ? 'You must enter a value' : '';
  }

  getEmailErrorMsg(): string {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMsg(): string {
    return this.password.hasError('required') ? 'You must enter a value' : '';
  }


  register(): void {
    if (this.name.valid && this.email.valid && this.password.valid && this.confirmPassword.valid && this.password.value === this.confirmPassword.value) {

    } else {
      this.name.markAsTouched();
      this.email.markAsTouched();
      this.password.markAsTouched();
      this.confirmPassword.markAsTouched();

    }
  }


}

