import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { routerTransition } from '../../router.animations';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
  animations: [routerTransition()]
})
export class DoctorsComponent implements OnInit {

  doctors: any;

  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder
  ) { }

  doctorsFilter = this.formBuilder.group({
    doctorSearch: ['']
  });

  ngOnInit() {
    this.getDoctors();
  }

  getDoctors() {
    const userID = JSON.parse(localStorage.getItem('userData'))['id'];
    // let data: {userId};
    this.spinner.show();
    this.userService.getDoctors(userID).subscribe(
      res => {
        this.doctors = res;
        this.spinner.hide();
      }
    );
  }

  onSubmit() {
    this.spinner.show();
    const userID = JSON.parse(localStorage.getItem('userData'))['id'];
    this.doctorsFilter.value.userID = userID;
    this.userService.getDoctors(this.doctorsFilter.value).subscribe(
      res => {
        this.doctors = res;
        this.spinner.hide();
      }
    );
  }

  onReset() {
    this.doctorsFilter.reset();
    this.getDoctors();
  }

}
