import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {

  @Input('dataForm') dataForm: FormGroup;
  @Input('editable') editable: boolean;
  constructor() { }

  ngOnInit() {
  }

}
