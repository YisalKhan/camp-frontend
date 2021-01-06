import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { routerTransition } from '../../router.animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [routerTransition()]
})
export class UsersComponent implements OnInit {

  p: number = 1;
  users: any;
  teams: any;
  designation: any;
  regions: any;
  pubnub: any;
  districts: any;
  territories: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  userFilter = this.formBuilder.group({
    territory: [''],
    region: [''],
    district: [''],
    teams: [''],
    userName: [''],
    is_multiple_teams: ['']
  });

  ngOnInit() {
    this.designation = JSON.parse(localStorage.getItem('userData'))['designation'];
    console.log(this.designation);
    this.spinner.show();
    this.getUsers();
    this.getRegions();
    this.getTeams();
  }

  addUser() {
    // debugger;
    this.router.navigate(['addUserForm'], {relativeTo: this.route});
  }

  getUsers() {
    this.spinner.show();
    const userID = JSON.parse(localStorage.getItem('userData'))['id'];
    this.userService.getUsers(userID).subscribe(
      res => {
        this.users = res;
        console.log(res);
        this.spinner.hide();
      },
      err => console.log(err)
    );
  }

  editUser(uid) {
    // this.userService.editUser(uid).subscribe(
    //   res => {
    //     console.log(res);
    //   }
    // );
    localStorage.setItem('editStatus', 'editing');
    this.router.navigate(['editUserForm', uid], {relativeTo: this.route});
    // console.log(uid);

  }

  getRegions() {
    this.userService.getRegions(JSON.parse(localStorage.getItem('userData'))['team']).subscribe(
      res => {
        this.regions = res;
      }
    );
  }

  getTeams() {
    this.userService.getUserTeams().subscribe(
      res => {
        this.teams = res;
      }
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

  onDeleteUser(uid) {
    this.userService.deleteUser(uid).subscribe(
      res => {
        this.toastr.error(res['success']);
        this.getUsers();
        // this.router.navigate(['users']);
      },
      err => console.log(err)
    );
  }

  onSubmit() {
    this.spinner.show();
    const userID = JSON.parse(localStorage.getItem('userData'))['id'];
    this.userService.getFilterUsers(this.userFilter.value, userID).subscribe(
      res => {
        this.users = res;
        this.spinner.hide();
      },
      err => console.log(err)
    );
  }

  onReset() {
    this.spinner.show();
    this.userFilter.reset();
    this.getUsers();
    this.spinner.hide();
  }

  downloadExcel() {
    this.spinner.show();
    this.userFilter.value.action = 'excel';
    const userID = JSON.parse(localStorage.getItem('userData'))['id'];
    this.userService.getFilterUsers(this.userFilter.value, userID).subscribe(
      res => {
        const link = JSON.stringify(res);
        window.open(JSON.parse(link), '_blank');
        this.spinner.hide();
      },
      err => console.log(err)
    );
  }

}
