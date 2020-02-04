import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {formatDate} from '@angular/common';

import { CampService } from '../../../services/camp.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { from } from 'rxjs';

@Component({
  selector: 'app-camps-request',
  templateUrl: './camps-request.component.html',
  styleUrls: ['./camps-request.component.scss'],
  animations: [routerTransition()]
})
export class CampsRequestComponent implements OnInit {

  camps: any;
  previous: any;
  future: any;

  constructor(
    private campService: CampService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
  ) { }

  campFilter = this.formBuilder.group({
    doctorName: [''],
    campType: [''],
    campStatus: ['']
  });

  ngOnInit() {
    this.route.url.subscribe((params: Params) => {
      if (params[0]['path'] == 'previousCamps') {
        this.previous = params[0]['path'];
      }
      if (params[0]['path'] == 'futureCamps') {
        this.future = params[0]['path'];
      }
    });
    if (this.previous == 'previousCamps') {
      // console.log('Previous Camps');
      this.getPreviousCamps();
    } else if (this.future == 'futureCamps') {
      // console.log(this.futureDate);
      this.getFutureCamps();
    } else {
      this.getCamps();
    }
  }

  getCamps() {
    this.campService.getCamps().subscribe(
      (res) => {
        this.camps = res;
    });
  }

  getPreviousCamps() {
    this.spinner.show();
    this.campService.getPreviousCamps().subscribe(
      (res) => {
        this.camps = res;
        this.spinner.hide();
    });
  }

  getFutureCamps() {
    let startDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    let endDate = (new Date().getFullYear()+1).toString() + '-' + (new Date().getMonth()+1).toString() + '-' + (new Date().getDate()).toString();
    let data = {startDate, endDate};
    this.spinner.show();
    this.campService.getFutureCamps(data).subscribe(
      (res) => {
        // console.log(res);
        this.camps = res;
        this.spinner.hide();
    });
  }

  viewCamp(campID) {
    // this.campService.viewCamp(campID).subscribe(
    //   (res) => {
    //     console.log(res);
    // });
    console.log(campID);
    this.router.navigate(['camps/viewEditCamp', campID]);
  }

  deleteCamp(campID) {
    this.spinner.show();
    this.campService.deleteCamp(campID).subscribe(
      res => {
        this.toastr.error(res['success']);
        this.getCamps();
        this.spinner.hide();
      },
      err => console.log(err)
    );
  }

  onSubmit(){
    this.spinner.show();
    this.campService.getFilteredCamps(this.campFilter.value).subscribe(
      (res) => {
        this.camps = res;
        this.spinner.hide();
    });
  }

}
