import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PubNubAngular } from 'pubnub-angular2';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;
    userData: any;
    approvedCounter: any = 0;
    createCounter: any = 0;
    role: any;

    constructor(
        private translate: TranslateService,
        private router: Router,
        private pubnub: PubNubAngular
    ) {
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
        this.pubnub.subscribe({ channels: ['createNotification', 'approvedNotification' ], triggerEvents: true, withPresence: true });
    }

    ngOnInit() {
        this.role = localStorage.getItem('userDesignation');
        this.pushRightClass = 'push-right';
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.pubnub.getMessage('createNotification', (msg) => {
            console.log(msg);
            this.createCounter =+ 1;
        });
        this.pubnub.getMessage('approvedNotification', (msg) => {
            console.log(msg);
            this.approvedCounter =+ 1;
        });
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    // onLoggedout() {
        // localStorage.removeItem('isLoggedin');
        // localStorage.clear();
    // }

    changeLang(language: string) {
        this.translate.use(language);
    }

    onApprovedNotification() {
        this.approvedCounter = 0;
        this.router.navigate(['/camps/approvedCamps']);
    }

    onCreateNotification() {
        this.createCounter = 0;
        this.router.navigate(['/camps/campsRequest']);
    }
}
