import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-confirm-data',
  templateUrl: './confirm-data.component.html',
  styleUrls: ['./confirm-data.component.scss']
})
export class ConfirmDataComponent implements OnInit {

  @Input('dataForm') dataForm: FormGroup;
  @Input('editable') editable: boolean;
  constructor() { }

  ngOnInit() {
  }

}
