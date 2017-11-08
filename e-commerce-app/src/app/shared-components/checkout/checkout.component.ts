import {Component, OnInit} from '@angular/core';
import {CardService} from '../../_services/card.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../_services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  dataForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, public _cardService: CardService, public _authService: AuthService) {
  }

  ngOnInit(): void {
    this.dataForm = this._formBuilder.group({
      // TODO pobieranie info usera
      name: ['Pawel', Validators.required],
      surname: ['Idziak', Validators.required],
      email: ['pa.idziak@gmail.com', Validators.required],
      telephone: ['663 406 004', Validators.required],
      street: ['Ulica', Validators.required],
      zip_code: ['67-400', Validators.required],
      city: ['Wschowa', Validators.required]
    });
  }

}
