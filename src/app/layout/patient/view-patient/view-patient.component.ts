import { Component, OnInit } from '@angular/core';

import { routerTransition } from '../../../router.animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.scss'],
  animations: [routerTransition()]
})
export class ViewPatientComponent implements OnInit {

  patients: any;

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.spinner.hide();
  }

  editPatient(pID) {
    console.log('patient');
  }

}
