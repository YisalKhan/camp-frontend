import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  data: any;
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
    ) { }
  passwordForm = this.formBuilder.group({
    password : ['', Validators.required],
    repeatPassword : ['', Validators.required],
  });

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const userId = JSON.parse(localStorage.getItem('userData'))['id'];
    this.userService.getEditUser(userId).subscribe(
      res => {
        this.data = res;
        console.log(this.data);
    });
  }

  onSubmit() {}
}
