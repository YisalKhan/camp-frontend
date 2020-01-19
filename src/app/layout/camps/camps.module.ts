import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from 'src/app/shared';
import { ReactiveFormsModule } from '@angular/forms';

import { CampsRoutingModule } from './camps-routing.module';
import { CampsComponent } from './camps.component';
import { AddCampsComponent } from './addcamps/addcamps.component';
import { CampsRequestComponent } from './camps-request/camps-request.component';
import { StatModule } from '../../shared';
import { EditcampsComponent } from './editcamps/editcamps.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ApprovedCampsComponent } from './approved-camps/approved-camps.component';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';


@NgModule({
  imports: [
    CommonModule,
    CampsRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
    StatModule,
    NgxSpinnerModule,
    DlDateTimeDateModule,  // <--- Determines the data type of the model
    DlDateTimePickerModule,
  ],
  declarations: [
    CampsComponent,
    AddCampsComponent,
    CampsRequestComponent,
    EditcampsComponent,
    ApprovedCampsComponent
  ]
})
export class CampsModule {}
