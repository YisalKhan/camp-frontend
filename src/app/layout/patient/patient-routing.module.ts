import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientComponent } from './patient.component';
import { ViewPatientComponent } from './view-patient/view-patient.component';

const routes: Routes = [
  { path: '', component: PatientComponent },
  { path: 'viewPatients', component: ViewPatientComponent },
  { path: 'allPatients', component: ViewPatientComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule {}
