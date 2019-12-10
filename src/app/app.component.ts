import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  lat: any;
  lng: any;

    constructor() {
    }

    ngOnInit() {
      if (navigator) {
        navigator.geolocation.getCurrentPosition( pos => {
          this.lng = pos.coords.longitude;
          this.lat = pos.coords.latitude;
          // console.log(pos);
          // console.log(this.lat);
          localStorage.setItem('latitude', this.lat);
          localStorage.setItem('longitude', this.lng);
        });
      }
    }
}
