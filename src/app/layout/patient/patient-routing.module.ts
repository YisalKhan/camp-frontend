import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientComponent } from './patient.component';
import { ViewPatientComponent } from './view-patient/view-patient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';

const routes: Routes = [
  { path: '', component: PatientComponent },
  { path: 'viewPatients', component: ViewPatientComponent },
  { path: 'allPatients', component: ViewPatientComponent },
  { path: 'editPatient/:id', component: EditPatientComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule {}
