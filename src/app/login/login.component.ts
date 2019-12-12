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
        localStorage.setItem('isLoggedin', 'true');
        this.router.navigate(['dashboard']);
        // console.log(res);
      }
    );
  }
}
