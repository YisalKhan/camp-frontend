import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MapsComponent } from 'src/app/maps/maps.component';
import {
    TimelineComponent,
    NotificationComponent,
    ChatComponent
} from './components';
import { StatModule } from '../../shared';
import { CampboyDashboardComponent } from './campboy-dashboard/campboy-dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule,
        NgbAlertModule,
        DashboardRoutingModule,
        StatModule
    ],
    declarations: [
        DashboardComponent,
        MapsComponent,
        TimelineComponent,
        NotificationComponent,
        ChatComponent,
        CampboyDashboardComponent
    ]
})
export class DashboardModule {}
