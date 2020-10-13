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
  campRequest: any;
  regions: any;
  districts: any;

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
    campStatus: [''],
    startDate: [''],
    endDate: [''],
    campDuration: [''],
    region: [''],
    district: ['']
  });

  ngOnInit() {
    this.route.url.subscribe((params: Params) => {
      if (params[0]['path'] == 'previousCamps') {
        this.previous = params[0]['path'];
      }
      if (params[0]['path'] == 'futureCamps') {
        this.future = params[0]['path'];
      }
      if(params[0]['path'] == 'campsRequest') {
        this.campRequest = params[0]['path'];
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
    this.getRegions();
  }

  getCamps() {
    const userID = JSON.parse(localStorage.getItem('userData'))['id'];
    this.campService.getCamps(userID).subscribe(
      (res) => {
        this.camps = res;
        for(let i = 0; i< this.camps.length; i++) {
          this.camps[i].camp_datetime = new Date(this.camps[i].camp_datetime);
        }
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
    const userID = JSON.parse(localStorage.getItem('userData'))['id'];
    this.campService.getFilteredCamps(this.campFilter.value, userID).subscribe(
      (res) => {
        this.camps = res;
        this.spinner.hide();
    });
  }

  onReset() {
    this.campFilter.controls['doctorName'].setValue('');
    this.campFilter.controls['campType'].setValue('');
    this.campFilter.controls['campStatus'].setValue('');
    this.campFilter.controls['startDate'].setValue('');
    this.campFilter.controls['endDate'].setValue('');
    this.campFilter.updateValueAndValidity();
    if (this.previous == 'previousCamps') {
      this.campFilter.reset();
      this.getPreviousCamps();
    } else if (this.future == 'futureCamps') {
      this.campFilter.reset();
      this.getFutureCamps();
    } else {
      this.campFilter.reset();
      this.getCamps();
    }
  }

  onPastCamps() {
    this.spinner.show();
    this.router.navigate(['camps/spoPastCamps']);
    this.spinner.hide();
  }

  onFutureCamps() {
    this.spinner.show();
    this.router.navigate(['camps/spoFutureCamps']);
    this.spinner.hide();
  }

  onDownloadExcel(){
    this.campFilter.value.action = 'excel';
    this.spinner.show();
    const userID = JSON.parse(localStorage.getItem('userData'))['id'];
    this.campService.getFilteredCamps(this.campFilter.value, userID).subscribe(
      (res) => {
        const link = JSON.stringify(res);
        window.open(JSON.parse(link), '_blank');
        this.spinner.hide();
    });
  }

  getRegions() {
    this.campService.getRegions(JSON.parse(localStorage.getItem('userData'))['team']).subscribe(
      res => {
        this.regions = res;
      }
    );
  }

  getDisctricts(regionID) {
    this.spinner.show();
    this.campService.getDistricts(regionID).subscribe(
      res => {
        this.districts = res;
        this.spinner.hide();
      },
      err => console.log(err)
    );
  }

}
