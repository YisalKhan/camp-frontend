import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { routerTransition } from '../../router.animations';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  animations: [routerTransition()]
})
export class ForgetPasswordComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) { }

  forgetPasswordForm = this.formBuilder.group({
    email: ['', Validators.required]
  });

  ngOnInit() {
  }

  onForgetPassword() {
    // console.log(this.forgetPasswordForm.value);
    this.spinner.show();
    if(this.forgetPasswordForm.value.email == "") {
      this.spinner.hide();
      this.toastr.error('Email is required');
    } else {
      this.userService.onForgetPassword(this.forgetPasswordForm.value).subscribe(
        res => {
          this.spinner.hide();
          this.toastr.success(res['message']);
        },
        err => {
          this.toastr.error(err['errorr']);
        }
      );
      // this.toastr.success('Email is required');
    }
  }

}
