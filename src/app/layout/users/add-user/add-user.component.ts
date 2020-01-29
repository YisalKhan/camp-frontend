import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../../services/user.service';

import { ToastrService } from 'ngx-toastr';
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
  public phone = {
    guide: true,
    showMask: true,
    mask: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  };
  public cnic = {
    guide: true,
    showMask: true,
    mask: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService
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
          this.toastr.success(res['success']);
          this.router.navigate(['users']);
        },
        err => {
          if (err['status'] === 422) {
            if (err['error']['errors']['email']) {
              this.toastr.error(err['error']['errors']['email'][0]);
            }
            if (err['error']['errors']['employeeCode']) {
              this.toastr.error(err['error']['errors']['employeeCode'][0]);
            }
            if (err['error']['errors']['cnic']) {
              this.toastr.error(err['error']['errors']['cnic'][0]);
            }
            if (err['error']['errors']['mobileNumber']) {
              this.toastr.error(err['error']['errors']['mobileNumber'][0]);
            }
          }
        }
      );
    } else {
      this.spinner.show();
      this.userService.createUser(this.userForm.value).subscribe(
        res => {
          this.toastr.success(res['success']);
          this.router.navigate(['users']);
        },
        err => {
          if (err['status'] === 422) {
            if (err['error']['errors']['email']) {
              this.toastr.error(err['error']['errors']['email'][0]);
            }
            if (err['error']['errors']['employeeCode']) {
              this.toastr.error(err['error']['errors']['employeeCode'][0]);
            }
            if (err['error']['errors']['cnic']) {
              this.toastr.error(err['error']['errors']['cnic'][0]);
            }
            if (err['error']['errors']['mobileNumber']) {
              this.toastr.error(err['error']['errors']['mobileNumber'][0]);
            }
          }
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
        console.log(this.data);
        this.getDisctricts(this.data.region);
        this.getTerritories(this.data.district);
        this.userForm.patchValue({
          name: this.data.name,
          cnic: this.data.cnic,
          designation: this.data.designation,
          employeeCode: this.data.employee_code,
          mobileNumber: this.data.mobile_no,
          email: this.data.email,
          // territory: this.data.territory,
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
        if (localStorage.getItem('editStatus')) {
          this.userForm.controls['district'].setValue(this.data.district);
        }
        console.log(this.userForm.value)
        this.districts = res;
        this.spinner.hide();
        // debugger;
      },
      err => console.log(err)
    );
  }

  getTerritories(districtID) {
    this.spinner.show();
    this.userService.getTerritories(districtID).subscribe(
      res => {
        if (localStorage.getItem('editStatus')) {
          this.userForm.controls['territory'].setValue(this.data.territory);
        }
        this.territories = res;
        this.spinner.hide();
      },
      err => console.log(err)
    );
  }
}
