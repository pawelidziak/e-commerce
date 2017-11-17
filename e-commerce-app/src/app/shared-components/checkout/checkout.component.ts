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

  constructor(private _formBuilder: FormBuilder, public _cartService: ShoppingCartService, public _authService: AuthService) {
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
        this.updateForm();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateForm(): void {
    const email = this._authService.currentUser ? this._authService.currentUser.email : '';
    this.dataForm = this._formBuilder.group({
      name: [this.user.name, Validators.required],
      surname: [this.user.surname, Validators.required],
      email: [email, Validators.required],
      telephone: [this.user.telephone, Validators.required],
      street: [this.user.street, Validators.required],
      zip_code: [this.user.zip_code, Validators.required],
      city: [this.user.city, Validators.required]
    });
  }

  makeOrder() {
    this._cartService.makeOrder2();
  }


}
