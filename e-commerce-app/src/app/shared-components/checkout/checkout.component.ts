import {Component, OnInit} from '@angular/core';
import {CardService} from '../../_services/card.service';
import {IBook} from '../../_models/IBook';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../_services/auth.service';
import {MatDialog} from '@angular/material';
import {AuthDialogComponent} from '../auth-dialog/auth-dialog.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  quantityControl = new FormControl();
  secondFormGroup: FormGroup;
  dataForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, public _cardService: CardService, public _authService: AuthService) {
  }

  ngOnInit(): void {
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.dataForm = this._formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      telephone: ['', Validators.required],
      address: ['', Validators.required],
      zip_code: ['', Validators.required],
      city: ['', Validators.required]
    });
  }
  setQuantity(book: IBook) {
    if (this.quantityControl.value <= 0) {
      this.quantityControl.setValue('1');
    }
    if (this.quantityControl.value > book.quantity) {
      this.quantityControl.setValue(book.quantity);
    }
  }

}
