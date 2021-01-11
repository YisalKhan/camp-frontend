import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.scss'],
  animations: [routerTransition()]
})
export class ViewPatientComponent implements OnInit {

  patients: any;
  allPatients: any;
  viewPatients: any;

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  patientsFilter = this.formBuilder.group({
    campType: [''],
    patient_search: ['']
  });

  ngOnInit() {
    this.route.url.subscribe((params: Params) => {
      if (params[0]['path'] == 'allPatients') {
        this.allPatients = params[0]['path'];
        this.getAllPatients();
      }
      if (params[0]['path'] == 'viewPatients') {
        this.viewPatients = params[0]['path'];
        this.getSpoPatients();
      }
    });
  }

  getAllPatients() {
    this.spinner.show();
    const userID = JSON.parse(localStorage.getItem('userData'))['id'];
    this.userService.getAllPatients(userID).subscribe(
      res => {
        this.patients = res;
        this.spinner.hide();
      }
    );
  }

  getSpoPatients() {
    this.spinner.show();
    const campId = localStorage.getItem('campId');
    this.userService.getSpoPatients(campId).subscribe(
      res => {
        this.patients = res;
        this.spinner.hide();
      }
    );
  }

  onEditPatient(pID: any) {
    this.router.navigate(['patients/editPatient', pID]);
  }

  onSubmit() {
    const userID = JSON.parse(localStorage.getItem('userData'))['id'];
    this.patientsFilter.value.userID = userID;
    this.userService.getAllPatients(this.patientsFilter.value).subscribe(
      res => {
        this.patients = res;
      }
    );
  }

  onReset() {
    this.patientsFilter.reset();
    this.getAllPatients();
  }

}
