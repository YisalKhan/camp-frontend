import { Component, OnInit } from '@angular/core';
import { CampService } from '../../../services/camp.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../../router.animations';
import { FormBuilder, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-camp-statistics',
  templateUrl: './camp-statistics.component.html',
  styleUrls: ['./camp-statistics.component.scss'],
  animations: [routerTransition()]
})
export class CampStatisticsComponent implements OnInit {

  userCampStats = [];
  backupUserCampStats = [];
  campStrips: any;
  searchInput: any;
  p: number = 1;

  constructor(
    private campService: CampService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) { }

  campFilter = this.formBuilder.group({
    campType: [''],
    startDate: [''],
    endDate: [''],
  });

  ngOnInit() {
    this.campStats();
  }

  campStats() {
    let userId = JSON.parse(localStorage.getItem('userData'));
    userId = userId['id'];
    this.spinner.show();
    this.campService.getCampStatsData(this.campFilter.value, userId).subscribe(
      res => {
        this.userCampStats = res['data'];
        this.userCampStats.forEach(ele => {
          ele.total_ready_camps === undefined ? ele.total_ready_camps = 0 : ele.total_ready_camps = ele.total_ready_camps;
          ele.total_completed_camps === undefined ? ele.total_completed_camps = 0 : ele.total_completed_camps = ele.total_completed_camps;
          ele.total_canceled_camps === undefined ? ele.total_canceled_camps = 0 : ele.total_canceled_camps = ele.total_canceled_camps;
        });
        this.backupUserCampStats = this.userCampStats;
      },
      err => {
        console.log(err);
      }
    );
    this.spinner.hide();
  }

  showCampDeatilPopup(campObj) {
    if(campObj == undefined) {
      $('#noCampFoundPop').modal('show');
    } else {
      $('#campStripsDataPop').modal('show');
      this.campStrips = campObj;
    }
  }

  searchByName() {
    if(this.searchInput == '') {
      this.userCampStats = this.backupUserCampStats;
    } else {
      if(this.userCampStats.filter((e) => { return e.name.toLowerCase().includes(this.searchInput.toLowerCase()) }).length > 0) {
        this.userCampStats = this.userCampStats.filter((e) => { return e.name.toLowerCase().includes(this.searchInput.toLowerCase()) });
      } else {
        this.userCampStats = this.backupUserCampStats;
        this.toastr.show('No user found');
      }
    }
  }

  onSubmit(){
    this.spinner.show();
    let userId = JSON.parse(localStorage.getItem('userData'));
    userId = userId['id'];
    this.campService.getCampStatsData(this.campFilter.value, userId).subscribe(
      (res) => {
        this.userCampStats = res['data'];
        this.userCampStats.forEach(ele => {
          ele.total_ready_camps === undefined ? ele.total_ready_camps = 0 : ele.total_ready_camps = ele.total_ready_camps;
          ele.total_completed_camps === undefined ? ele.total_completed_camps = 0 : ele.total_completed_camps = ele.total_completed_camps;
          ele.total_canceled_camps === undefined ? ele.total_canceled_camps = 0 : ele.total_canceled_camps = ele.total_canceled_camps;
        });
        this.backupUserCampStats = this.userCampStats;
        this.spinner.hide();
    });
  }

  onReset() {
    this.campFilter.controls['campType'].setValue('');
    this.campFilter.controls['startDate'].setValue('');
    this.campFilter.controls['endDate'].setValue('');
    this.campFilter.updateValueAndValidity();
    this.campStats();
  }

  onDownloadExcel() {
    this.campFilter.value.action = 'excel';
    this.spinner.show();
    let userId = JSON.parse(localStorage.getItem('userData'));
    userId = userId['id'];
    this.campService.getCampStatsData(this.campFilter.value, userId).subscribe(
      (res) => {
        const link = JSON.stringify(res);
        window.open(JSON.parse(link), '_blank');
        this.spinner.hide();
    });
  }

}
