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

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  patientsFilter = this.formBuilder.group({
    campType: ['']
  });

  ngOnInit() {
    this.route.url.subscribe((params: Params) => {
      if (params[0]['path'] == 'allPatients') {
        this.allPatients = params[0]['path'];
        this.getAllPatients();
      }
    })
    this.spinner.show();
    this.spinner.hide();
  }

  getAllPatients() {
    let data = {};
    this.userService.getAllPatients(data).subscribe(
      res => {
        this.patients = res;
      }
    );
  }

  editPatient(pID) {
    console.log('patient');
  }

  onSubmit() {
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
