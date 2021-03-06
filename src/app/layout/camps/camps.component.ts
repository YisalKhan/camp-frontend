import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-camps',
  templateUrl: './camps.component.html',
  styleUrls: ['./camps.component.scss']
})
export class CampsComponent implements OnInit {

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
  }

  onAssignedCamps() {
    this.spinner.show();
    this.router.navigate(['camps/approvedCamps']);
    this.spinner.hide();
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

  spoCreateCamp() {
    this.spinner.show();
    this.router.navigate(['/camps/requestCamp']);
    this.spinner.hide();
  }

}
