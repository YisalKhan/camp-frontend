import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
  editPatientPath: any;
  isReadonly: any = false;
  patientId: any;
  patientData: any;
  optionValue1: any; optionValue2: any; optionValue3: any; optionValue4: any; optionValue5: any;

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private campService: CampService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  patientForm = this.formBuilder.group({
    patientName: ['', Validators.required],
    patientPhoneNo: ['', Validators.required],
    patientAge: ['', Validators.required],
    patientGender: ['', Validators.required],
    patientDiastolic: [''],
    patientSystolic: [''],
    patientBloodSugar: [''],
    isCompanyDrug1: [''],
    isCompanyDrug2: [''],
    isCompanyDrug3: [''],
    isCompanyDrug4: [''],
    isCompanyDrug5: [''],
    drugName1: [''],
    drugName2: [''],
    drugName3: [''],
    drugName4: [''],
    drugName5: [''],
  });

  ngOnInit() {
  }
  onSubmit() {
    const campId = localStorage.getItem('campId');
    this.patientForm.value.camp_id = campId;
    this.campService.addPatient(this.patientForm.value).subscribe(
      res => {
        this.toastr.success(res['success']);
        this.patientForm.reset();
      }
    );
  }

}
