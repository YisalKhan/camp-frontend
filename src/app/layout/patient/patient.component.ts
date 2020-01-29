import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { CampService } from '../../services/camp.service';

import { routerTransition } from '../../router.animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
  animations: [routerTransition()]
})
export class PatientComponent implements OnInit {

  campType: any;
  optionValue1: any; optionValue2: any; optionValue3: any; optionValue4: any; optionValue5: any;

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private campService: CampService,
    private toastr: ToastrService
  ) { }

  patientForm = this.formBuilder.group({
    patientName: ['', Validators.required],
    patientPhoneNo: ['', Validators.required],
    patientAge: ['', Validators.required],
    patientGender: ['', Validators.required],
    patientDiastolic: [''],
    patientSystolic: [''],
    patientBloodSugar: [''],
    companyName1: [''],
    companyName2: [''],
    companyName3: [''],
    companyName4: [''],
    companyName5: ['']
  });

  ngOnInit() {
    this.campType = localStorage.getItem('campType');
  }

  onSubmit() {
    // this.spinner.show();
    const campId = localStorage.getItem('campId');
    this.patientForm.value.camp_id = campId;
    this.campService.addPatient(this.patientForm.value).subscribe(
      // res => console.log(res);
      // this.patientForm.reset();
      res => {
        this.toastr.success(res['success']);
        // console.log(res);
        this.patientForm.reset();
      }
    );
  }

}
