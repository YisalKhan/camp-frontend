import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { UserService } from '../../services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [routerTransition()]
})
export class UsersComponent implements OnInit {

  users: any;
  regions: any;
  pubnub: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.getUsers();
    this.getRegions();
  }

  addUser() {
    // debugger;
    this.router.navigate(['addUserForm'], {relativeTo: this.route});
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      res => {
        this.users = res;
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
    this.userService.getRegions().subscribe(
      res => {
        this.regions = res;
      }
    );
  }

  onDeleteUser(uid) {
    this.userService.deleteUser(uid).subscribe(
      res => {
        this.toastr.error(res['success']);
      },
      err => console.log(err)
    );
  }

}
