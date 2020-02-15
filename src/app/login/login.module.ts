import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { from } from 'rxjs';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule {}
