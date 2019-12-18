import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { routerTransition } from '../router.animations';

import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

  submitted = false;
  loginForm: FormGroup;
  data: any;

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onLoggedin() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loginService.userLogin(this.loginForm.value).subscribe(
      res => {
        this.data = res['success'];
        if (this.data.user.designation !== '9' && this.data.user.designation !== '10' && this.data.user.designation !== '11') {
          localStorage.setItem('isLoggedin', 'true');
          localStorage.setItem('userData', JSON.stringify(this.data.user));
          localStorage.setItem('userDesignation', this.data.user.designation);
          this.router.navigate(['dashboard']);
        } else {
          localStorage.setItem('userDesignation', this.data.user.designation);
          localStorage.setItem('userData', JSON.stringify(this.data.user));
          localStorage.setItem('isLoggedin', 'true');
          this.router.navigate(['camps']);
        }
      }
    );
  }
}
