import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientComponent } from './patient.component';
import { PatientRoutingModule } from './patient-routing.module';
import { ViewPatientComponent } from './view-patient/view-patient.component';
import { PageHeaderModule } from 'src/app/shared';

import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  imports: [
    CommonModule,
    PatientRoutingModule,
    ReactiveFormsModule,
    PageHeaderModule,
    NgxSpinnerModule
  ],
  declarations: [
    PatientComponent,
    ViewPatientComponent
  ]
})
export class PatientModule {}
