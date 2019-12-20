import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [routerTransition()]
})
export class UsersComponent implements OnInit {

  users: any;
  regions: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
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
