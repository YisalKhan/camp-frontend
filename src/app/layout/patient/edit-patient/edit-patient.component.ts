import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CampService } from 'src/app/services/camp.service';
import { routerTransition } from 'src/app/router.animations';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss'],
  animations: [routerTransition()]
})
export class EditPatientComponent implements OnInit {

  campType: any;
  patientId: any;
  isReadonly: boolean = true;
  patientData: any;
  optionValue1: any; optionValue2: any; optionValue3: any; optionValue4: any; optionValue5: any;
  // patientName: any;
  // patientNumber: any;
  // patientAge: any;
  // patientGender: any;
  // patientDiastolic: any;
  // patientSystolic: any;
  // patientBloodSugar: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private campService: CampService
  ) { }

  patientDrugForm = this.formBuilder.group({
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
    this.route.url.subscribe((params: Params) => {
      this.patientId = params[1]['path'];
    });
    this.getPatient();
  }

  getPatient() {
    this.campService.getPatient(this.patientId).subscribe(
      res => {
        this.patientData = res[0];
        // this.patientName = res[0]['patient_name'];
        console.log(this.patientData);
      }
    );
  }

  onSubmit() {
    console.log(this.patientDrugForm.value);
    this.campService.updatePatientDrugs(this.patientId, this.patientDrugForm.value).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

}
