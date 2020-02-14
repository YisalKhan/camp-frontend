import { Component, OnInit } from '@angular/core';
import { PubNubAngular } from 'pubnub-angular2';
import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  lat: any;
  lng: any;
  pubnub: any;

    constructor(pubnub: PubNubAngular) {
        pubnub.init({ publishKey: 'pub-c-02414160-d913-45c5-8531-0eaa1dffa163', subscribeKey: 'sub-c-1901bc68-330b-11ea-a820-f6a3bb2caa12' });
        this.pubnub = pubnub;
    }

    ngOnInit() {
        // this.pubnub.publish({ channel: environment.pubnubChannel, message: {heelo: 'sdfsdf'} }, (response) => {
        //     console.log(response, 'published');
        // });
    //   if (navigator) {
          const role_id = localStorage.getItem('userDesignation');
          const user_data = JSON.parse(localStorage.getItem('userData'));
          if (role_id === '9') {
              navigator.geolocation.watchPosition((data) => {
                  const lat_lng = {
                      'user_id': user_data.id,
                      'lat': data.coords.latitude,
                      'lng': data.coords.longitude
                  };
                  // publishing on pubnub channel
                  this.pubnub.publish({ channel: environment.pubnubChannel, message: lat_lng }, (response) => {
                      console.log(response, 'published');
                  });
              });
          } /*else if (role_id === '1' || role_id === '2' || role_id === '3') {
              // listening to pubnub message
              this.pubnub.getMessage('myChannel', (msg) => {
                  console.log(msg);
              });
              this.pubnub.getError((err) => {
                  console.log(err);
              });
          }*/
        navigator.geolocation.getCurrentPosition( pos => {
          this.lng = pos.coords.longitude;
          this.lat = pos.coords.latitude;
          // console.log(pos);
          // console.log(this.lat);
          localStorage.setItem('latitude', this.lat);
          localStorage.setItem('longitude', this.lng);
        });
    //   }
    }
}
