import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Router, ActivatedRoute } from '@angular/router';

import { CampService } from '../../../services/camp.service';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';

@Component({
  selector: 'app-camps-request',
  templateUrl: './camps-request.component.html',
  styleUrls: ['./camps-request.component.scss'],
  animations: [routerTransition()]
})
export class CampsRequestComponent implements OnInit {

  camps: any;

  constructor(
    private campService: CampService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getCamps();
  }

  getCamps() {
    this.campService.getCamps().subscribe(
      (res) => {
        this.camps = res;
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
    this.campService.deleteCamp(campID).subscribe(
      res => {
        this.toastr.error(res['success']);
        this.getCamps();
      },
      err => console.log(err)
    );
  }

}
