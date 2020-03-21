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
        // tslint:disable-next-line:triple-equals
          if (role_id == '11' || role_id == '12' || role_id == '13') {
              navigator.geolocation.watchPosition((data) => {
                  const lat_lng = {
                      'user_id': user_data.id,
                      'lat': data.coords.latitude,
                      'lng': data.coords.longitude
                  };
                  // publishing on pubnub channel
                  this.pubnub.publish({ channel: environment.pubnubChannel, message: lat_lng }, (response) => {
                      console.log(response, 'published');
                    //   navigator.geolocation.getCurrentPosition((pos)=> {
                    //     console.log(pos);
                    //   });
                  });
                  console.log(data);
                //   navigator.geolocation.
                console.log(this.distance(data.coords.latitude, data.coords.longitude,31.5147, 74.3114));
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

    distance(lat1, lon1, lat2, lon2) 
    {
      var R = 6371; // km
      var dLat = this.toRad(lat2-lat1);
      var dLon = this.toRad(lon2-lon1);
      lat1 = this.toRad(lat1);
      lat2 = this.toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }
    
    toRad(Value) 
    {
        return Value * Math.PI / 180;
    }
}
