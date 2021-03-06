import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { routerTransition } from '../../../router.animations';
import { CampService } from '../../../services/camp.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PubNubAngular } from 'pubnub-angular2';

@Component({
  selector: 'app-addcamps',
  templateUrl: './addcamps.component.html',
  styleUrls: ['./addcamps.component.scss'],
  animations: [routerTransition()]
})
export class AddCampsComponent implements OnInit {
  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;

  campUserID: any;
  userData: any;
  map: any;
  address: any;
  dateTime: any;
  campType: any;
  public phone = {
    guide: true,
    showMask: true,
    mask: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  };

  constructor(
    private formBuilder: FormBuilder,
    private campService: CampService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private pubnub: PubNubAngular
  ) { }

  campForm = this.formBuilder.group({
    campType: ['', Validators.required],
    doctorName: ['', Validators.required],
    doctorPhoneNumber: ['', Validators.required],
    doctorID: ['', Validators.required],
    campDateAndTime: ['', Validators.required],
    campAddress: ['', Validators.required],
    bpApparatus: [''],
    campLat: ['129123'],
    campLang: ['129123'],
    bloodSugarMeter: [''],
    strips: [''],
    flyers: [''],
    screeingSlips: ['']
  });

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.campUserID = this.userData.id;
    navigator.geolocation.getCurrentPosition((data) => {
      const mapOptions: google.maps.MapOptions = {
        center: {lat: data.coords.latitude, lng: data.coords.longitude},
        zoom: 17
      };
      const markers = [];
      const map = new google.maps.Map(document.getElementById('map'), mapOptions);
        const input = document.getElementById('searchTextField');
        const autocomplete = new google.maps.places.Autocomplete(<HTMLInputElement>input);
        const that = this;
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            const place = autocomplete.getPlace();
            that.campForm.controls['campAddress'].setValue(place.formatted_address);
            that.campForm.controls['campLat'].setValue(place.geometry.location.lat());
            that.campForm.controls['campLang'].setValue(place.geometry.location.lng());
            that.clearMarkers(markers);
            // tslint:disable-next-line:no-unused-expression
            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng()),
                map: map,
            });
            markers.push(marker);
        });
      google.maps.event.addListener(map, 'click', (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        const latlng = new google.maps.LatLng(lat, lng);
        const geoCoder = new google.maps.Geocoder();
        geoCoder.geocode({ 'location': latlng }, (results, status) => {
          this.address = results[0];
          this.clearMarkers(markers);
            // tslint:disable-next-line:no-unused-expression
          const marker = new google.maps.Marker({
              position: new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()),
              map: map,
          });
          markers.push(marker);
          this.campForm.controls['campAddress'].setValue(this.address.formatted_address);
        });
      });
    });
  }
  clearMarkers(markers) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  }

  onSubmit() {
    this.spinner.show();
    this.campForm.controls['flyers'].setValue(parseInt(this.campForm.value.flyers));
    this.campForm.controls['screeingSlips'].setValue(parseInt(this.campForm.value.screeingSlips));
    this.campForm.value.campUserID = this.campUserID;
    this.campService.createCamp(this.campForm.value).subscribe(
      res => {
        this.pubnub.publish({ channel: 'createNotification', message: {heelo: 'Camp Create'} }, (response) => {
          console.log(response, 'published');
        });
        this.spinner.hide();
        this.toastr.success(res['success']);
        this.router.navigate(['/camps']);
      }
    );
  }

  campTypeChanged() {
    this.campType = this.campForm.value.campType;
  }
}
