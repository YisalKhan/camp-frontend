import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { CampService } from '../../../services/camp.service';
import { routerTransition } from '../../../router.animations';

@Component({
  selector: 'app-editcamps',
  templateUrl: './editcamps.component.html',
  styleUrls: ['./editcamps.component.scss'],
  animations: [routerTransition()]
})
export class EditcampsComponent implements OnInit {

  campId: any;
  campData: any;

  constructor(
    private formBuilder: FormBuilder,
    private campService: CampService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  campEditForm = this.formBuilder.group({
    campType: ['', Validators.required],
    doctorName: ['', Validators.required],
    campDateAndTime: ['', Validators.required],
    campAddress: ['', Validators.required],
    bpApparatus: ['', Validators.required],
    campLat: ['129123'],
    campLang: ['129123'],
    bloodSugarMeter: ['', Validators.required],
    strips: ['', Validators.required],
    flyers: ['', Validators.required],
    screeingSlips: ['', Validators.required]
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
            campDateAndTime: this.campData.camp_datetime,
            campAddress: this.campData.address,
            bpApparatus: this.campData.is_bp_apparatus,
            campLat: this.campData.lat,
            campLang: this.campData.lng,
            bloodSugarMeter: this.campData.is_bs_meter,
            strips: this.campData.no_of_strips,
            flyers: this.campData.no_of_flyers,
            screeingSlips: this.campData.no_of_screening_slips
          });
          this.spinner.hide();
        }
      );
    });
  }

  onCampApprove(cid) {
    this.spinner.show();
    const userID = JSON.parse(localStorage.getItem('userData'))['id'];
    this.campService.campApprove(cid, userID).subscribe(
      res => {
        console.log(res);
        this.spinner.hide();
      }
    );
  }

}
