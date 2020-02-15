import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isActive: boolean;
    collapsed: boolean;
    showSubItems:boolean;
    showMenu: string;
    pushRightClass: string;
    userDesignation: any;

    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor(
        private translate: TranslateService,
        private route: ActivatedRoute,
        private router: Router,
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
    }

    ngOnInit() {
        this.isActive = false;
        this.collapsed = false;
        this.showSubItems = false;
        this.showMenu = '';
        this.pushRightClass = 'push-right';
        this.userDesignation = localStorage.getItem('userDesignation');
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }
    subItemsToggle() {

        this.showSubItems = ! this.showSubItems;
        
    }
    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    // onLoggedout() {
    //     localStorage.removeItem('isLoggedin');
    // }

    spoCreateCamp() {
        this.router.navigate(['/camps/requestCamp']);
    }

    requestedCamps() {
        this.router.navigate(['/camps/campsRequest']);
    }

    spoDashboardLink() {
        this.router.navigate(['/camps']);
    }

    spoPatient() {
        this.router.navigate(['/patients/viewPatients']);
    }

    onLoggedout() {
        localStorage.clear();
    }

    onProfile() {
        this.router.navigate(['/users/profile']);
    }

    onDoctors() {
        this.router.navigate(['doctors']);
    }

    onPatients() {
        this.router.navigate(['/patients/allPatients']);
    } 
}
