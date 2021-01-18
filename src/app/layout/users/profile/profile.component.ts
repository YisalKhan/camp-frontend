import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  name: any; role: any; employeeCode: any; email: any; mobileNo: any; cnic: any; userTeam: any;
  userRegion: any; userDistrict: any; userTerritory: any;
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
    ) { }
  passwordForm = this.formBuilder.group({
    oldPassword: ['', Validators.required],
    password : ['', Validators.required],
    repeatPassword : ['', Validators.required],
  });

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.spinner.show();
    const userId = JSON.parse(localStorage.getItem('userData'))['id'];
    this.userService.getEditUser(userId).subscribe(
      res => {
        this.name = res['name'];
        this.role = res['user_role']['role_name'];
        this.employeeCode = res['employee_code'];
        this.email = res['email'];
        this.mobileNo = res['mobile_no'];
        this.cnic = res['cnic'];
        this.userTeam = res['user_team'] === null ? null : res['user_team']['team_name'];
        this.userRegion = res['user_region'] === null ? null : res['user_region']['region_name'];
        this.userDistrict = res['user_district'] === null ? null : res['user_district']['district_name'];
        this.userTerritory = res['user_territory'] === null ? null : res['user_territory']['territory_name'];
      this.spinner.hide();
    });
  }

  onSubmit() {
    this.spinner.show();
    const userId = JSON.parse(localStorage.getItem('userData'))['id'];
    this.passwordForm.value.userID = userId;
    this.passwordForm.value.email = this.email;
    if (this.passwordForm.value.password == this.passwordForm.value.repeatPassword) {
      this.userService.updatePassword(this.passwordForm.value).subscribe(
        res => {
          if(res['success']) {
            this.toastr.success(res['success']);
            this.passwordForm.reset();
            this.router.navigate(['/users/profile']);
            this.spinner.hide();
          }
        },
        err => {
          this.toastr.error(err['error'].message);
          this.spinner.hide();
        }
      );
    } else {
      this.toastr.error('Password does not match.');
      this.spinner.hide();
    }
  }
}
