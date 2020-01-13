import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { UserService } from '../../services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PubNubAngular } from 'pubnub-angular2';

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
    pubnub: PubNubAngular
  ) {
      this.pubnub = pubnub;
  }

  ngOnInit() {
    this.spinner.show();
    this.getUsers();
    this.getRegions();
    // listening to pubnub message
      this.pubnub.subscribe({ channels: ['myChannel'], triggerEvents: true, withPresence: true });
      this.pubnub.getMessage('myChannel', (msg) => {
          console.log(msg);
      });
      this.pubnub.getError((err) => {
          console.log(err);
      });
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

}
