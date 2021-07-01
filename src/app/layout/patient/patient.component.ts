import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CampService } from '../../services/camp.service';

import { routerTransition } from '../../router.animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { parse } from 'querystring';

  declare var $: any;

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
  cclMedicines: any;
  otherMedicines: any;
  optionValue1: any; optionValue2: any; optionValue3: any; optionValue4: any; optionValue5: any;
  drugSearch1: any;
  stripsRequested: any;
  stripsReceived: any;
  stripsUsed: any = '';

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
    drug1: [''],
    drug2: [''],
    drug3: [''],
    drug4: [''],
    drug5: [''],
    companyName1: [''],
    companyName2: [''],
    companyName3: [''],
    companyName4: [''],
    companyName5: [''],
  });

  ngOnInit() {
    this.getCclMedicine();
    this.getOtherMedicine();
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

  getCclMedicine() {
    this.campService.getCclMedicine().subscribe(
      res => {
        console.log(res);
        this.cclMedicines = res['data'];
      },
      err => {
        console.log(err);
      }
    );
  }

  getOtherMedicine() {
    this.campService.getOtherMedicine().subscribe(
      res => {
        console.log(res);
        this.otherMedicines = res['data'];
      },
      err => {
        console.log(err);
      }
    );
  }

  searchMedicine() {
    console.log($('#drugSearch1').val());
  }

  showCloseCampPop() {
    console.log(parseInt(localStorage.getItem('campType')));
    if(parseInt(localStorage.getItem('campType')) == 2) {
      console.log('in if');
      this.stripsRequested = localStorage.getItem('stripsRequested');
      this.stripsReceived = localStorage.getItem('stripReceived');
      $('#showCloseCampPop').modal('show');
    } else {
      console.log('in else');
      this.campService.closeCamp(localStorage.getItem('campId'), 0).subscribe(
        res => {
          this.toastr.show(res['success']);
          this.router.navigate(['camps']);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  closeCampPop() {
    $('#showCloseCampPop').modal('hide');
  }

  closeDibeticCamp() {
    this.campService.closeCamp(localStorage.getItem('campId'), this.stripsUsed).subscribe(
      res => {
        this.toastr.show(res['success']);
        $('#showCloseCampPop').modal('hide');
        this.router.navigate(['camps']);
      },
      err => {
        console.log(err);
      }
    );
  }

}
