import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
// import { AppComponent } from '../app.component';
import { PubNubAngular } from 'pubnub-angular2';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit, AfterViewInit {

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  maps: google.maps.Map;
  pubnub: any;
  // lat = 31.518875299999998;
  // lng = 74.3082251;
  // marker: any;
  constructor(public pubnb: PubNubAngular, private toastr: ToastrService) {
    // pubnb.init({ publishKey: 'pub-c-02414160-d913-45c5-8531-0eaa1dffa163', subscribeKey: 'sub-c-1901bc68-330b-11ea-a820-f6a3bb2caa12' });
    this.pubnub = pubnb;
  }
  lat: any = localStorage.getItem('latitude');
  lng: any = localStorage.getItem('longitude');
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    // center: 
    center:  {
      lat: 30.3753,
      lng: 69.3451
    },
    zoom: 6,
    // country: 
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  endImage = {
    url: 'assets/images/icons/customerpin.png', // url
    scaledSize: new google.maps.Size(30, 42), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(16, 41) // anchor
  };
  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.maps,
    // draggable: true,
    icon: this.endImage,
  });

  ngOnInit() {
    // this.pubnub.getMessage(environment.pubnubChannel, (msg) => {
    //   console.log(msg);
    // });
    // navigator.geolocation.watchPosition((data) => {
    //   console.log(data);
    //   // remove old marker
    //   const marker = new google.maps.Marker({
    //     position: new google.maps.LatLng(data.coords.latitude, data.coords.longitude),
    //     map: this.maps,
    //   });
    // });
    // if (navigator) {
      const role_id = localStorage.getItem('userDesignation');
      const markers = [];
      // tslint:disable-next-line:triple-equals
      if (role_id == '1' || role_id == '2' || role_id == '3' || role_id == '4' || role_id == '5' || role_id == '6' ||role_id == '7' || role_id == '8' || role_id == '9' || role_id == '10') {
          // listening to pubnub message
          this.pubnub.subscribe({ channels: [environment.pubnubChannel], triggerEvents: true, withPresence: true });
          this.pubnub.getMessage(environment.pubnubChannel, (msg) => {
              console.log(msg);
              this.clearMarkers(markers[msg.user_id], msg);
              const marker = new google.maps.Marker({
                position: new google.maps.LatLng(msg.message.lat, msg.message.lng),
                map: this.maps,
              });
              markers.push(marker);
          });
          if(localStorage.getItem('CampLat') && localStorage.getItem('CampLng')) {
            this.pubnub.subscribe({ channels: [environment.pubnubCampLocaion], triggerEvents: true, withPresence: true });
            this.pubnub.getMessage(environment.pubnubCampLocaion, (msg) => {
              console.log(msg);
              this.toastr.info(msg['message']);
            });
          }
          this.pubnub.getError((err) => {
              console.log(err);
          });
      }
    navigator.geolocation.getCurrentPosition( pos => {
      this.lng = pos.coords.longitude;
      this.lat = pos.coords.latitude;
      // console.log(pos);
      // console.log(this.lat);
      localStorage.setItem('latitude', this.lat);
      localStorage.setItem('longitude', this.lng);
    });
  // }
}

  // trackLocation ({onSuccess, onError = () => {} }) {
  //   if ('geolocation' in navigator === false) {
  //     return onError();
  //   }
  //   // console.log(navigator.geolocation.watchPosition(onSuccess, onError));
  //   return navigator.geolocation.watchPosition(onSuccess, onError);
  // }
  clearMarkers(marker, user_info) {
      const date = new Date();
      const dateTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

      let diff = Math.abs(<any>new Date(dateTime) - <any>new Date(user_info.last_activity));
      let minutes = Math.floor((diff/1000)/60);

      if (typeof marker !== 'undefined' || minutes > 1) {
          marker.setMap(null);
      }
  }

  ngAfterViewInit() {
    this.mapInitializer();
  }

  mapInitializer() {
    // debugger;
    this.maps = new google.maps.Map(this.gmap.nativeElement,
    this.mapOptions);
    this.marker.setMap(this.maps);
   }

  //  displayLocationInfo(position) {
  //   console.log(position);
  // }
}
