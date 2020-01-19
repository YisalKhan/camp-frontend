import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CampService } from '../../../services/camp.service';

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

  constructor(
    private campService: CampService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getCamps();
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

  startCamp( cId: any, campType: any ) {
    this.spinner.show();
    localStorage.setItem('campId', cId);
    localStorage.setItem('campType', campType);
    this.campService.viewCamp(cId).subscribe(
      res => {
        // this.campData = res;
        this.campData = {
          userId: res['user_id'],
          campId: res['id'],
          lat: res['lat'],
          lng: res['lng']
        };
        // console.log(this.campData);
        this.campService.getCampPermission(this.campData).subscribe(
          // res1 => console.log(res1)
          res1 => {
            this.toastr.success(res1['success']);
            this.router.navigate(['/patients']);
            this.spinner.hide();
          },
          err => {
            this.toastr.error(err['error']);
          }
        );
      }
    );
  }

}
