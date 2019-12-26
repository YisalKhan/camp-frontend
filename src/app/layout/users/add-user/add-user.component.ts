import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../../services/user.service';

import { routerTransition } from '../../../router.animations';
import { from } from 'rxjs';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss'],
    animations: [routerTransition()]
})
export class AddUserComponent implements OnInit {

  roles: any;
  teams: any;
  editStatus: any;
  userID: any;
  data: any;
  regions: any;
  districts: any;
  territories: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  userForm = this.formBuilder.group({
    name : ['', Validators.required],
    cnic : ['', Validators.required],
    designation : ['', Validators.required],
    employeeCode : ['', Validators.required],
    mobileNumber : ['', Validators.required],
    email : ['', Validators.required],
    territory : ['', Validators.required],
    district : ['', Validators.required],
    region : ['', Validators.required],
    team : ['', Validators.required],
  });

  ngOnInit() {
    this.spinner.show();
    this.getUserRoles();
    this.getUserTeams();
    this.getRegions();
    if (localStorage.getItem('editStatus')) {
      this.editStatus = true;
      this.route.params.subscribe((params: Params) => {
        this.userID = params['userID'];
      });
      this.getEditUser(this.userID);
    }
  }

  getUserRoles() {
    this.userService.getUserRoles().subscribe(
      res => {
        this.roles = res;
        this.spinner.hide();
      },
      err => console.log(err)
    );
  }

  getUserTeams() {
    this.userService.getUserTeams().subscribe(
      res => {
        this.teams = res;
      },
      err => console.log(err)
    );
  }

  onSubmit() {
    if (this.editStatus) {
      this.userService.updateUser(this.userID, this.userForm.value).subscribe(
        res => {
          console.log(res);
        }
      );
    } else {
      this.spinner.show();
      this.userService.createUser(this.userForm.value).subscribe(
        res => {
          alert('User has been created Successfully');
          this.router.navigate(['users']);
        }
      );
      this.spinner.hide();
    }
  }

  onClearForm() {
    this.userForm.reset();
    this.editStatus = false;
  }

  onDelete() {

  }

  getEditUser(uid) {
    this.userService.getEditUser(uid).subscribe(
      res => {
        this.data = res;
        this.userForm.patchValue({
          name: this.data.name,
          cnic: this.data.cnic,
          designation: this.data.designation,
          employeeCode: this.data.employee_code,
          mobileNumber: this.data.mobile_no,
          email: this.data.email,
          territory: this.data.territory,
          district: this.data.district,
          region: this.data.region,
          team: this.data.team
        });
      },
      err => console.log(err)
    );
  }

  getRegions() {
    this.userService.getRegions().subscribe(
      res => {
        this.regions = res;
      },
      err => console.log(err)
    );
  }

  getDisctricts(regionID) {
    this.spinner.show();
    this.userService.getDistricts(regionID).subscribe(
      res => {
        this.districts = res;
        this.spinner.hide();
      },
      err => console.log(err)
    );
  }

  getTerritories(districtID) {
    this.spinner.show();
    this.userService.getTerritories(districtID).subscribe(
      res => {
        this.territories = res;
        this.spinner.hide();
      },
      err => console.log(err)
    );
  }
}
