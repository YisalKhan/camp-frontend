import { Component, OnInit } from '@angular/core';
import { PubNubAngular } from 'pubnub-angular2';
import { environment } from '../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  lat: any;
  lng: any;
  pubnub: any;

    constructor(pubnub: PubNubAngular, private toastr: ToastrService) {
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
            // get current date and time and send it along lat/lng of user to check if the user is in active or not
            const date = new Date();
            const dateTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
              navigator.geolocation.watchPosition((data) => {
                  const lat_lng = {
                      'user_id': user_data.id,
                      'lat': data.coords.latitude,
                      'lng': data.coords.longitude,
                      'last_activity': dateTime
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
                if(this.distance(data.coords.latitude, data.coords.longitude, localStorage.getItem('CampLat'), localStorage.getItem('CampLng')) > 1) {
                    // this.toastr.error();
                    this.pubnub.publish({ channel: environment.pubnubCampLocaion, message: 'SPO is out of his camp' }, (res) => {
                        console.log(res, 'publish');
                    });
                }
                // console.log(this.distance(data.coords.latitude, data.coords.longitude,31.5147, 74.3114));
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

    distance(lat1, lon1, lat2, lon2) {
      const R = 6371; // km
      const dLat = this.toRad(lat2-lat1);
      const dLon = this.toRad(lon2-lon1);
      lat1 = this.toRad(lat1);
      lat2 = this.toRad(lat2);

      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const d = R * c;
      return d;
    }
    
    toRad(Value) {
        return Value * Math.PI / 180;
    }
}
