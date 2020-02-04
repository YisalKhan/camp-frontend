import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCampsComponent } from './addcamps/addcamps.component';
import { CampsComponent } from './camps.component';
import { CampsRequestComponent } from './camps-request/camps-request.component';
import { EditcampsComponent } from './editcamps/editcamps.component';
import { ApprovedCampsComponent } from './approved-camps/approved-camps.component';

const routes: Routes = [
  { path: '', component: CampsComponent },
  { path: 'requestCamp', component: AddCampsComponent },
  { path: 'campsRequest', component: CampsRequestComponent },
  { path: 'viewEditCamp/:campID', component: EditcampsComponent },
  { path: 'approvedCamps', component: ApprovedCampsComponent },
  { path: 'previousCamps', component: CampsRequestComponent },
  { path: 'futureCamps', component: CampsRequestComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class CampsRoutingModule {}
