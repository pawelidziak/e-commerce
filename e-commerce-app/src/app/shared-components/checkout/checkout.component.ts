import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ShoppingCartService} from '../../_services/shopping-cart.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../_services/auth.service';
import {IUser} from '../../_models/IUser';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnChanges {

  dataForm: FormGroup = null;
  user: IUser = null;

  constructor(private _formBuilder: FormBuilder, public _cardService: ShoppingCartService, public _authService: AuthService) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getUser();
  }

  getUser(): void {
    this._authService.getUserFormDB(this._authService.currentUserId).subscribe(
      (user) => {
        this.user = user;
        this.updateForm(this.user);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateForm(user: IUser): void {
    const email = this._authService.currentUser ? this._authService.currentUser.email : '';
    console.log('update form');
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

}
