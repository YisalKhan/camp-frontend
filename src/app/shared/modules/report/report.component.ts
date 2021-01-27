import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
    @Input() bgClass: string;
    // @Input() icon: string;
    // @Input() iconImage: string;
    // @Input() bgIcon: string;
    @Input() count: number;
    @Input() label: string;
    @Input() smallLabel: string;
    @Input() data: number;
    @Input() customClass: number;
    @Output() event: EventEmitter<any> = new EventEmitter();

    constructor() {}

    ngOnInit() {}
}
