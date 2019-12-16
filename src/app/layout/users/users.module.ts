import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { PageHeaderModule } from '../../shared';
import { AddUserComponent } from './add-user/add-user.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule
  ],
  declarations: [
    UsersComponent,
    AddUserComponent
  ]
})
export class UsersModule {}
