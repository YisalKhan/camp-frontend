import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { routerTransition } from '../../../router.animations';
import { CampService } from '../../../services/camp.service';

@Component({
  selector: 'app-addcamps',
  templateUrl: './addcamps.component.html',
  styleUrls: ['./addcamps.component.scss'],
  animations: [routerTransition()]
})
export class AddCampsComponent implements OnInit {
  campUserID: any;
  userData: any;

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;

  map: any;

  constructor(
    private formBuilder: FormBuilder,
    private campService: CampService
  ) { }

  campForm = this.formBuilder.group({
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
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.campUserID = this.userData.id;
    navigator.geolocation.getCurrentPosition((data) => {
      const mapOptions: google.maps.MapOptions = {
        center: {lat: data.coords.latitude, lng: data.coords.longitude},
        zoom: 17
      };
      const map = new google.maps.Map(document.getElementById('map'), mapOptions);
      google.maps.event.addListener(map, 'click', (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        console.log(lat, lng);
      });
    });
  }

  onSubmit() {
    this.campForm.value.campUserID = this.campUserID;
    this.campService.createCamp(this.campForm.value).subscribe(
      res => {
        console.log(res);
      }
    );
  }

}
