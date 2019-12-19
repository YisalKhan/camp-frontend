import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
// import { CampboyDashboardComponent } from './campboy-dashboard/campboy-dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  // { path: 'SPOdashboard', component: CampboyDashboardComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
