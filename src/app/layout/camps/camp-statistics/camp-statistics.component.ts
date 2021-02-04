import { Component, OnInit } from '@angular/core';
import { CampService } from '../../../services/camp.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { routerTransition } from '../../../router.animations';

declare var $: any;

@Component({
  selector: 'app-camp-statistics',
  templateUrl: './camp-statistics.component.html',
  styleUrls: ['./camp-statistics.component.scss'],
  animations: [routerTransition()]
})
export class CampStatisticsComponent implements OnInit {

  userCampStats = [];
  campStrips: any;

  constructor(
    private campService: CampService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.campStats();
  }

  campStats() {
    let userId = JSON.parse(localStorage.getItem('userData'));
    userId = userId['id'];
    this.spinner.show();
    this.campService.getCampStatsData(userId).subscribe(
      res => {
        this.userCampStats = res['data'];
        this.userCampStats.forEach(ele => {
          ele.total_ready_camps === undefined ? ele.total_ready_camps = 0 : ele.total_ready_camps = ele.total_ready_camps;
          ele.total_completed_camps === undefined ? ele.total_completed_camps = 0 : ele.total_completed_camps = ele.total_completed_camps;
          ele.total_canceled_camps === undefined ? ele.total_canceled_camps = 0 : ele.total_canceled_camps = ele.total_canceled_camps;
        });
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

}
