import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCampsComponent } from './addcamps/addcamps.component';
import { CampsComponent } from './camps.component';

const routes: Routes = [
  { path: '', component: CampsComponent },
  { path: 'requestCamp', component: AddCampsComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class CampsRoutingModule {}
