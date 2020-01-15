import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { CampService } from '../../services/camp.service';

import { routerTransition } from '../../router.animations';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
  animations: [routerTransition()]
})
export class PatientComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private campService: CampService
  ) { }

  patientForm = this.formBuilder.group({
    patientName: ['', Validators.required],
    patientPhoneNo: ['', Validators.required],
    patientGender: ['', Validators.required]
  });

  ngOnInit() {
  }

  onSubmit() {
    this.spinner.show();
    const campId = localStorage.getItem('campId');
    this.patientForm.value.camp_id = campId;
    this.campService.addPatient(this.patientForm.value).subscribe(
      res => console.log(res)
    );
  }

}
