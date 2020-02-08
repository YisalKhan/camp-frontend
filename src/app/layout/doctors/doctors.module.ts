import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorsRoutingModule } from './doctors-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from 'src/app/shared';
import { DoctorsComponent } from './doctors.component';

import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    DoctorsRoutingModule,
    ReactiveFormsModule,
    PageHeaderModule,
    NgxSpinnerModule
  ],
  declarations: [
    DoctorsComponent
  ]
})
export class DoctorsModule {}