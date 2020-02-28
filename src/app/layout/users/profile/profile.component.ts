import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  data: any;
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
    ) { }
  passwordForm = this.formBuilder.group({
    oldPassword: ['', Validators.required],
    password : ['', Validators.required],
    // repeatPassword : ['', Validators.required],
  });

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const userId = JSON.parse(localStorage.getItem('userData'))['id'];
    this.userService.getEditUser(userId).subscribe(
      res => {
        this.data = res;
        console.log(res);
    });
  }

  onSubmit() {
    const userId = JSON.parse(localStorage.getItem('userData'))['id'];
    this.passwordForm.value.userID = userId;
    this.userService.updatePassword(this.passwordForm.value).subscribe(
      res => {
        if(res['success']) {
          this.toastr.success(res['success']);
          this.router.navigate(['/users/profile']);
        }
        if(!res['success']) {
          this.toastr.error(res['error']);
        }
      }
    );
  }
}
