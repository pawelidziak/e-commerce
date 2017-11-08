import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../_services/auth.service';
import {IUser} from '../../_models/IUser';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  private sub: Subscription;

  user: IUser;
  dataForm: FormGroup;
  loading: boolean;
  error: string;

  constructor(private _authService: AuthService, private _formBuilder: FormBuilder, private _route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this._route.params.subscribe(
      params => {
        this.getUser(params['uid']);
      });
  }

  getUser(uid: string): void {
    this.loading = true;
    this._authService.getUserFormDB(uid).subscribe(
      user => {
        this.user = user;
        this.updateForm(user);
        this.loading = false;
      },
      error => {
        this.error = <any>error;
        this.loading = false;
      });

  }

  updateForm(user: IUser): void {
    this.dataForm = this._formBuilder.group({
      name: [user.name, Validators.required],
      surname: [user.surname, Validators.required],
      email: [this._authService.currentUser.email, Validators.required],
      telephone: [user.telephone, Validators.required],
      street: [user.street, Validators.required],
      zip_code: [user.zip_code, Validators.required],
      city: [user.city, Validators.required]
    });
  }

  updateUser(): void {
    console.log(this.dataForm.controls['name'].value);
    // TODO aktualizacja danych usera
  }
}
