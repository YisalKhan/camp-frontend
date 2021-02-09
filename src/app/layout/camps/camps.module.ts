import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from 'src/app/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CampsRoutingModule } from './camps-routing.module';
import { CampsComponent } from './camps.component';
import { AddCampsComponent } from './addcamps/addcamps.component';
import { CampsRequestComponent } from './camps-request/camps-request.component';
import { StatModule } from '../../shared';
import { EditcampsComponent } from './editcamps/editcamps.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ApprovedCampsComponent } from './approved-camps/approved-camps.component';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { TextMaskModule } from 'angular2-text-mask';
import { DatePipe } from '@angular/common';
import { CampStatisticsComponent } from './camp-statistics/camp-statistics.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  imports: [
    CommonModule,
    CampsRoutingModule,
    PageHeaderModule,
    FormsModule,
    ReactiveFormsModule,
    StatModule,
    NgxSpinnerModule,
    DlDateTimeDateModule,  // <--- Determines the data type of the model
    DlDateTimePickerModule,
    TextMaskModule,
    NgxPaginationModule
  ],
  declarations: [
    CampsComponent,
    AddCampsComponent,
    CampsRequestComponent,
    EditcampsComponent,
    ApprovedCampsComponent,
    CampStatisticsComponent
  ],
  providers: [
    DatePipe
  ]
})
export class CampsModule {}
