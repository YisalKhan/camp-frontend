import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { CampService } from '../../../services/camp.service';
import { routerTransition } from '../../../router.animations';

@Component({
  selector: 'app-editcamps',
  templateUrl: './editcamps.component.html',
  styleUrls: ['./editcamps.component.scss'],
  animations: [routerTransition()]
})
export class EditcampsComponent implements OnInit {

  campId: any;

  constructor(
    private formBuilder: FormBuilder,
    private campService: CampService,
    private route: ActivatedRoute
  ) { }

  campEditForm = this.formBuilder.group({
    campName: ['', Validators.required],
    campType: ['', Validators.required],
    doctorName: ['', Validators.required],
    campDateAndTime: ['', Validators.required],
    campAddress: ['', Validators.required],
    bpApparatus: ['', Validators.required],
    campLat: ['129123'],
    campLang: ['129123'],
    bloodSugarMeter: ['', Validators.required],
    strips: ['', Validators.required],
    flyers: ['', Validators.required],
    screeingSlips: ['', Validators.required]
  });

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.campId = params['campID'];
      this.campService.viewCamp(this.campId).subscribe(
        (res) => {
          console.log(res);
        }
      );
    });
  }

  onSubmit() {
    // this.campForm.value.campUserID = this.campUserID;
    // this.campService.createCamp(this.campForm.value).subscribe(
    //   res => {
    //     console.log(res);
    //   }
    // );
  }

}
