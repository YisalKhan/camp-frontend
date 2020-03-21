import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CampService } from '../../../services/camp.service';
import { formatDate } from '@angular/common';

import { routerTransition } from '../../../router.animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-approved-camps',
  templateUrl: './approved-camps.component.html',
  styleUrls: ['./approved-camps.component.scss'],
  animations: [routerTransition()]
})
export class ApprovedCampsComponent implements OnInit {

  camps: any;
  campData: any;
  past: any;
  future: any;
  heading: any;

  constructor(
    private campService: CampService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.route.url.subscribe((params: Params) => {
      if (params[0]['path'] == 'spoPastCamps') {
        this.past = params[0]['path'];
        this.heading = 'Previous Camps';
      }
      if (params[0]['path'] == 'spoFutureCamps') {
        this.future = params[0]['path'];
        this.heading = 'Future Camps';
      }
    });
    if (this.past == 'spoPastCamps') {
      this.getPastCamps();
    } else if (this.future == 'spoFutureCamps') {
      this.getFutureCamps();
    } else {
      this.heading = 'Current Camps';
      this.getCamps();
    }
  }

  getCamps() {
    this.spinner.show();
    const userID = JSON.parse(localStorage.getItem('userData'))['id'];
    this.campService.getApprovedCamps(userID).subscribe(
      res => {
        this.camps = res;
        this.spinner.hide();
      }
    );
  }

  getPastCamps() {
    this.spinner.show();
    const userID = JSON.parse(localStorage.getItem('userData'))['id'];
    this.campService.getSpoPastCamps(userID).subscribe(
      res => {
        this.camps = res;
        this.spinner.hide();
      }
    );
  }

  getFutureCamps() {
    let startDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    let endDate = (new Date().getFullYear()+1).toString() + '-' + (new Date().getMonth()+1).toString() + '-' + (new Date().getDate()).toString();
    const userID = JSON.parse(localStorage.getItem('userData'))['id'];
    let data = {startDate, endDate, userID, campReportType: 'future'};
    this.spinner.show();
    this.campService.getSpoFutureCamps(data).subscribe(
      res => {
        this.camps = res;
        this.spinner.hide();
      }
    );
  }

  startCamp( cId: any, campType: any ) {
    this.spinner.show();
    localStorage.setItem('campId', cId);
    localStorage.setItem('campType', campType);
    this.campService.viewCamp(cId).subscribe(
      res => {
        this.campData = {
          userId: res['user_id'],
          campId: res['id'],
          lat: res['lat'],
          lng: res['lng']
        };
        this.campService.getCampPermission(this.campData).subscribe(
          res1 => {
            if(res1['error']) {
              this.toastr.error(res1['error']);
              this.spinner.hide();
            }
            else {
              this.toastr.success(res1['success']);
              this.router.navigate(['/patients']);
              this.spinner.hide();
            }
          },
          err => {
            this.toastr.error(err['error']);
          }
        );
      }
    );
  }

}
