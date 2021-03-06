import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-stat',
    templateUrl: './stat.component.html',
    styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
    @Input() bgClass: string;
    @Input() icon: string;
    @Input() iconImage: string;
    @Input() bgIcon: string;
    @Input() count: number;
    @Input() label: string;
    @Input() smallLabel: string;
    @Input() data: number;
    @Input() customClass: number;
    @Output() event: EventEmitter<any> = new EventEmitter();

    constructor() {}

    ngOnInit() {}
}
