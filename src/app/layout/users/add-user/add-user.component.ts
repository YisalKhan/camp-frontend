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
  showDisTer: any = false;
  showTer: any = false;
  showFields: any = false;
  showTeam: any = false;
  roleId: any;
  selectTeam: boolean;
  checkedArr = new Array;
  multipleTeams: any;

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
    territory : [''],
    district : [''],
    region : [''],
    team : [''],
  });

  ngOnInit() {
    this.spinner.show();
    this.getUserRoles();
    this.getUserTeams();
    // this.getRegions('');
    if (localStorage.getItem('editStatus')) {
      this.showTeam = true;
      this.selectTeam = true;
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
      this.spinner.show();
      if(this.userForm.value.team === true) {
        this.userForm.value.team = this.checkedArr;
        this.userForm.value.isMultiple = 1;
      }
      if(this.userForm.value.team.length == 1) {
        this.userForm.value.isMultiple = 0;
      }
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
      this.spinner.hide();
      localStorage.removeItem('editStatus');
    } else {
      this.spinner.show();
      if(this.userForm.value.team === true) {
        this.userForm.value.team = this.checkedArr;
        this.userForm.value.isMultiple = 1;
      }
      if(this.userForm.value.team.length == 1) {
        this.userForm.value.isMultiple = 0;
      }
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
    localStorage.removeItem('editStatus');
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
        if(this.data.is_multiple_teams == 1) {
          this.getRegions(this.data.multiple_teams[0].id);
          this.selectTeam = false;
          this.multipleTeams = this.data.multiple_teams;
          for(let i = 0; i < this.teams.length; i++) {
            for(let j = 0; j < this.multipleTeams.length; j++) {
              if(this.teams[i].id == this.multipleTeams[j].id) {
                this.teams[i].selected = true;
              }
            }
          }
        }
        if(this.data.is_multiple_teams == 0) {
          this.getRegions(this.data.team);
          this.selectTeam = true;
        }
        
      },
      err => console.log(err)
    );
  }

  selectTeamFunction(id) {
    this.getRegions(id);
    // this.userForm.value.isMultiple = 0;
    console.log(this.userForm);
  }

  getRegions(teamId) {
    this.userService.getRegions(teamId).subscribe(
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

  getDesignation(roleId) {
    if(roleId == 1 || roleId == 2) {
      this.roleId = roleId;
      this.userForm.controls['district'].clearValidators();
      this.userForm.controls['team'].clearValidators();
      this.userForm.controls['territory'].clearValidators();
      this.userForm.controls['region'].setValue('0');
      this.userForm.updateValueAndValidity();
      this.showFields = false;
      this.showTeam = false;
      this.selectTeam = true;
    }
    if(roleId == 3 || roleId == 4 || roleId == 5 || roleId == 6 || roleId == 7) {
      this.roleId = roleId;
      this.userForm.controls['team'].setValidators(Validators.required);
      this.userForm.controls['district'].clearValidators();
      this.userForm.controls['territory'].clearValidators();
      this.userForm.controls['region'].setValue('0');
      this.userForm.updateValueAndValidity
      this.showTeam = true;
      this.showFields = false;
      this.selectTeam = true;
    }
    if(roleId == 8 || roleId == 9) {
      this.roleId = roleId;
      this.userForm.controls['team'].setValidators(Validators.required);
      this.userForm.controls['region'].setValidators(Validators.required);
      this.userForm.controls['district'].clearValidators();
      this.userForm.controls['territory'].clearValidators();
      this.userForm.updateValueAndValidity();
      this.showTeam = true;
      this.showFields = false;
      this.selectTeam = true;
    }
    if(roleId == 10 || roleId == 11) {
      this.roleId = roleId;
      this.userForm.controls['team'].setValidators(Validators.required);
      this.userForm.controls['region'].setValidators(Validators.required);
      this.userForm.controls['district'].setValidators(Validators.required);
      this.userForm.controls['territory'].clearValidators();
      this.userForm.updateValueAndValidity();
      this.showTeam = true;
      this.showFields = false;
      this.selectTeam = true;
    }
    if(roleId == 12 || roleId == 13 || roleId == 14) {
      this.roleId = roleId;
      this.userForm.controls['team'].setValidators(Validators.required);
      this.userForm.controls['region'].setValidators(Validators.required);
      this.userForm.controls['district'].setValidators(Validators.required);
      this.userForm.controls['territory'].setValidators(Validators.required);
      this.userForm.updateValueAndValidity();
      this.showTeam = true;
      this.showFields = true;
      this.selectTeam = true;
    }
    if(roleId == 15 || roleId == 16) {
      this.roleId = roleId;
      this.userForm.controls['team'].setValidators(Validators.required);
      this.userForm.controls['region'].setValidators(Validators.required);
      this.userForm.controls['district'].clearValidators();
      this.userForm.controls['territory'].clearValidators();
      this.userForm.updateValueAndValidity();
      this.showTeam = true;
      this.showFields = false;
      this.selectTeam = false;
    }
    if(roleId == 17 || roleId == 18) {
      this.roleId = roleId;
      this.userForm.controls['team'].setValidators(Validators.required);
      this.userForm.controls['region'].setValidators(Validators.required);
      this.userForm.controls['district'].setValidators(Validators.required);
      this.userForm.controls['territory'].clearValidators();
      this.userForm.updateValueAndValidity();
      this.showTeam = true;
      this.showFields = false;
      this.selectTeam = false;
    }
  }

  onTeamChecked(event, id) {
    this.checkedArr;
    console.log(event);
    if(event.target.checked == true) {
      this.checkedArr.push(id);
    } else {
      const index = this.checkedArr.indexOf(id);
      this.checkedArr.splice(index, 1);
    }
    console.log(this.checkedArr);
    this.userForm.value.team = this.checkedArr;
    // this.userForm.value.isMultiple = 1;
    this.getRegions(this.checkedArr[0]);
    console.log(this.userForm.value);
  }
  onCancel() {
    this.router.navigate(['users']);
  }
}
