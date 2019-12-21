import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from 'src/app/shared';
import { ReactiveFormsModule } from '@angular/forms';

import { CampsRoutingModule } from './camps-routing.module';
import { CampsComponent } from './camps.component';
import { AddCampsComponent } from './addcamps/addcamps.component';
import { CampsRequestComponent } from './camps-request/camps-request.component';

@NgModule({
  imports: [
    CommonModule,
    CampsRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule
  ],
  declarations: [
    CampsComponent,
    AddCampsComponent,
    CampsRequestComponent
  ]
})
export class CampsModule {}
