import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { routerTransition } from '../../router.animations';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
  ) { }

  forgetPasswordForm = this.formBuilder.group({
    email: ['', Validators.required]
  });

  ngOnInit() {
  }

  onForgetPassword() {
    console.log(this.forgetPasswordForm.value);
    if(this.forgetPasswordForm.value.email == "") {
      this.toastr.error('Email is required');
    } else {
      this.toastr.success('Email is required');
    }
  }

}
