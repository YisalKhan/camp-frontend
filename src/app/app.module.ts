import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PubNubAngular } from 'pubnub-angular2';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ToastrModule } from 'ngx-toastr';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,
        TextMaskModule,
        SweetAlert2Module.forRoot(),
        ToastrModule.forRoot(),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    declarations: [AppComponent],
    providers: [AuthGuard, PubNubAngular],
    bootstrap: [AppComponent]
})
export class AppModule {}
