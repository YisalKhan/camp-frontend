import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { PageHeaderModule } from '../../shared';
import { AddUserComponent } from './add-user/add-user.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TextMaskModule } from 'angular2-text-mask';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    TextMaskModule
  ],
  declarations: [
    UsersComponent,
    AddUserComponent,
    ProfileComponent
  ]
})
export class UsersModule {}
