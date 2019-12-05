import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  userForm = this.formBuilder.group({
    name : ['', Validators.required],
    cnic : ['', Validators.required],
    designition : ['', Validators.required],
    employeeCode : ['', Validators.required],
    mobileNumber : ['', Validators.required],
    email : ['', Validators.required],
    territory : ['', Validators.required],
    district : ['', Validators.required],
    region : ['', Validators.required],
    team : ['', Validators.required],
  });

  ngOnInit() {
    this.userService.getUserRoles().subscribe(
      res => {
        this.roles = res['data'];
        // console.log(this.roles);
      },
      err => console.log(err)
    );
      // debugger;
  }

  onSubmit() {
    console.log(this.userForm);
  }
}
