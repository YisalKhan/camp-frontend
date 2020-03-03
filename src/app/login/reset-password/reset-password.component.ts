import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { routerTransition } from '../../router.animations';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  animations: [routerTransition()]
})
export class ResetPasswordComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) { }

  token: any;

  resetPasswordForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    password_confirmation: ['', Validators.required]
  });

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.token = params['token'];
      this.userService.tokenVerification(params['token']).subscribe(
        res => {
          this.resetPasswordForm.controls['email'].setValue(res['email']);
        },
        err => {
          this.router.navigate(['/login/user/forgetPassword']);
          this.toastr.error(err.error['message']);
        }
      );
    });
  }

  onResetPassword() {
    this.resetPasswordForm.value.token = this.token;
    this.spinner.show();
    this.userService.onResetPassword(this.resetPasswordForm.value).subscribe(
      res => {
        this.router.navigate(['']);
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.toastr.error(err.error.errors.password[0]);
      }
    );
  }

}
