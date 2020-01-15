import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CampService } from '../../../services/camp.service';

import { routerTransition } from '../../../router.animations';

@Component({
  selector: 'app-approved-camps',
  templateUrl: './approved-camps.component.html',
  styleUrls: ['./approved-camps.component.scss'],
  animations: [routerTransition()]
})
export class ApprovedCampsComponent implements OnInit {

  camps: any;

  constructor(
    private campService: CampService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCamps();
  }

  getCamps() {
    const userID = JSON.parse(localStorage.getItem('userData'))['id'];
    this.campService.getApprovedCamps(userID).subscribe(
      res => this.camps = res
    );
  }

  startCamp(cId) {
    localStorage.setItem('campId', cId);
    this.router.navigate(['/patients']);
  }

}
