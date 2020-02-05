import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientComponent } from './patient.component';
// import { NgxSpinnerComponent } from 'ngx-spinner';
import { PatientRoutingModule } from './patient-routing.module';
import { ViewPatientComponent } from './view-patient/view-patient.component';

@NgModule({
  imports: [
    CommonModule,
    PatientRoutingModule,
    ReactiveFormsModule,
    // NgxSpinnerComponent
  ],
  declarations: [
    PatientComponent,
    ViewPatientComponent
  ]
})
export class PatientModule {}
