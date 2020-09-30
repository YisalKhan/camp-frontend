import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from "moment";
import { DatePipe } from '@angular/common';

import { CampService } from '../../../services/camp.service';
import { routerTransition } from '../../../router.animations';
import { ToastrService } from 'ngx-toastr';
import { PubNubAngular } from 'pubnub-angular2';

@Component({
  selector: 'app-editcamps',
  templateUrl: './editcamps.component.html',
  styleUrls: ['./editcamps.component.scss'],
  animations: [routerTransition()]
})
export class EditcampsComponent implements OnInit {

  campId: any;
  campData: any;
  campStatus: any;
  campType: any;
  dateTime: any;
  public phone = {
    guide: true,
    showMask: true,
    mask: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  };
  flyersValue: any;
  screeingSlipsValue: any;

  constructor(
    private formBuilder: FormBuilder,
    private campService: CampService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private pubnub: PubNubAngular,
    private datePipe: DatePipe
  ) { }

  campEditForm = this.formBuilder.group({
    campType: ['', Validators.required],
    doctorName: ['', Validators.required],
    doctorPhoneNumber: ['', Validators.required],
    doctorID: ['', Validators.required],
    campDateAndTime: ['', Validators.required],
    campDateAndTimeSecond: [''],
    campAddress: ['', Validators.required],
    bpApparatus: [''],
    campLat: ['129123'],
    campLang: ['129123'],
    bloodSugarMeter: [''],
    strips: [''],
    flyers: [''],
    screeingSlips: ['']
  });

  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      this.campId = params['campID'];
      this.campService.viewCamp(this.campId).subscribe(
        (res) => {
          console.log(res);
          this.campData = res;
          this.campEditForm.patchValue({
            campType: this.campData.camp_type,
            doctorName: this.campData.dr_name,
            doctorPhoneNumber: this.campData.dr_phone_no,
            doctorID: this.campData.dr_id,
            campDateAndTime: this.datePipe.transform(this.campData.camp_datetime, 'EEEE MMM d, y, h:mm:ss a'),
            campAddress: this.campData.address,
            bpApparatus: this.campData.is_bp_apparatus,
            campLat: this.campData.lat,
            campLang: this.campData.lng,
            bloodSugarMeter: this.campData.is_bs_meter,
            strips: this.campData.no_of_strips,
            flyers: this.campData.no_of_flyers,
            screeingSlips: this.campData.no_of_screening_slips
          });
          this.flyersValue =  this.campData.no_of_flyers;
          this.screeingSlipsValue = this.campData.no_of_screening_slips;
          // this.campStatus = res['camp_status'];
          this.spinner.hide();
        }
      );
    });
  }

  onCampApprove(cid) {
    const userID = JSON.parse(localStorage.getItem('userData'))['id'];
    this.campEditForm.value.campDateAndTime = this.campEditForm['campDateAndTimeSecond'];
    // debugger;
    this.campService.campApprove(cid, userID).subscribe(
      res => {
        this.pubnub.publish({ channel: 'approvedNotification', message: {heelo: 'Camp Approved'} }, (response) => {
          console.log(response, 'published');
        });
        // console.log(res);
        this.toastr.success(res['success']);
        this.router.navigate(['/camps/campsRequest']);
      }
    );
  }

  onCampUpdate(cid: any) {
    const userID = JSON.parse(localStorage.getItem('userData'))['id'];
    this.campEditForm.value.campUserID = userID;
    this.campEditForm.value.campDateAndTime = this.campEditForm['campDateAndTimeSecond'];
    this.campService.updateCamp(cid, this.campEditForm.value).subscribe(
      res => {
        this.toastr.success(res['success']);
      },
      err => {
        console.log(err);
      }
    );
  }

  onBack() {
    this.router.navigate(['/camps/campsRequest']);
  }

  campTypeChanged() {
    this.campType = this.campEditForm.value.campType;
  }

}
