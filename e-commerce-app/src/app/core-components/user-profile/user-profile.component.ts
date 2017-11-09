import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
export class UserProfileComponent implements OnInit, OnChanges {

  user: IUser;
  dataForm: FormGroup;
  loading: boolean;
  error: string;

  constructor(public _authService: AuthService, private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getUser();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getUser();
  }

  getUser(): void {
    this.loading = true;
    this._authService.getUserFormDB(this._authService.currentUserId).subscribe(
      (user) => {
        this.user = user;
        this.updateForm(this.user);
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  updateForm(user: IUser): void {
    const email = this._authService.currentUser ? this._authService.currentUser.email : '';
    this.dataForm = this._formBuilder.group({
      name: [user.name, Validators.required],
      surname: [user.surname, Validators.required],
      email: [email, Validators.required],
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
