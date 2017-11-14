import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../_services/auth.service';
import {IUser} from '../../../_models/IUser';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  name = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  surname = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  telephone = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(30)]);
  street = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  zip_code = new FormControl('', [Validators.required]);
  city = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  password = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]);
  confirmPassword = new FormControl('');

  hidePassword = true;

  error: string;
  response: string;

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService) {
  }

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      name: this.name,
      surname: this.surname,
      email: this.email,
      telephone: this.telephone,
      street: this.street,
      zip_code: this.zip_code,
      city: this.city,
      password: this.password,
      confirmPassword: this.confirmPassword
    });
  }

  register(): void {
    this.error = '';
    if (this.registerForm.valid && this.password.value === this.confirmPassword.value) {

      const user: IUser = {
        name: this.name.value,
        surname: this.surname.value,
        telephone: this.telephone.value,
        street: this.street.value,
        zip_code: this.zip_code.value,
        city: this.city.value,
        isAdmin: false
      };

      this._authService.emailSignUp(this.email.value, this.password.value, user)
        .then(() => {
          this.response = 'You have been registered! Confirmation email was sent.';
          this.error = '';
        })
        .catch((error: any) => {
          this.error = error;
          this.response = '';
        });
    } else {
      Object.keys(this.registerForm.controls).forEach(key => {
        if (this.registerForm.get(key).invalid) {
          this.error = 'At least one of fields is invalid.';
          return;
        }
      });
      if (this.password.value !== this.confirmPassword.value && this.error === '') {
        this.error = 'Password mismatch';
      }
    }
  }


}

