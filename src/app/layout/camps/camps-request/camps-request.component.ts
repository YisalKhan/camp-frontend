import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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
    this.getCamps();
  }

  getCamps() {
    this.campService.getCamps().subscribe(
      (res) => {
        this.camps = res;
        console.log(this.camps);
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
    debugger
    console.log(this.campFilter.value);
    this.campService.getFilteredCamps(this.campFilter.value).subscribe(
      (res) => {
        this.camps = res;
        console.log(this.camps);
        this.spinner.hide();
    });
  }

}
