import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PubNubAngular } from 'pubnub-angular2';
import { NotificationService } from '../../../services/notification.service';

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
        private pubnub: PubNubAngular,
        private notificationService: NotificationService
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
        this.notificationService.getUnreadNotifications(this.userData['id']).subscribe(res => {
            if (this.role == '11' || this.role == '12' || this.role == '13') {
                this.approvedCounter = res;
            } else {
                this.createCounter = res;
            }
        });
        this.pubnub.getMessage('createNotification', (msg) => {
            this.notificationService.getUnreadNotifications(this.userData['id']).subscribe(res => {
                this.createCounter = res;
            });
        });
        this.pubnub.getMessage('approvedNotification', (msg) => {
            this.notificationService.getUnreadNotifications(this.userData['id']).subscribe(res => {
                this.approvedCounter = res;
            });
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
        this.notificationService.markAsReadNotification(this.userData['id']).subscribe(
            res => {
                this.router.navigate(['/camps/approvedCamps']);
            }
        );
    }

    onCreateNotification() {
        this.createCounter = 0;
        this.notificationService.markAsReadNotification(this.userData['id']).subscribe(
            res => {
                this.router.navigate(['/camps/campsRequest']);
            }
        );
    }

    onLoggedout() {
        localStorage.clear();
    }
}
