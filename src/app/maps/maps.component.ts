import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
// import { AppComponent } from '../app.component';
import { PubNubAngular } from 'pubnub-angular2';
import { environment } from '../../environments/environment';
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
  constructor(public pubnb: PubNubAngular) {
    // pubnb.init({ publishKey: 'pub-c-02414160-d913-45c5-8531-0eaa1dffa163', subscribeKey: 'sub-c-1901bc68-330b-11ea-a820-f6a3bb2caa12' });
    this.pubnub = pubnb;
  }
  lat: any = localStorage.getItem('latitude');
  lng: any = localStorage.getItem('longitude');
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 12,
  };
  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.maps,
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
      this.pubnub.subscribe({ channels: [environment.pubnubChannel], triggerEvents: true, withPresence: true });
      this.pubnub.getMessage(environment.pubnubChannel, (msg) => {
          console.log(msg);
          this.clearMarkers(markers[msg.user_id]);
          const marker = new google.maps.Marker({
              position: new google.maps.LatLng(msg.message.lat, msg.message.lng),
              map: this.maps,
          });
          markers.push(marker);
      });
      this.pubnub.getError((err) => {
          console.log(err);
      });
      // if (role_id === '1' || role_id === '2' || role_id === '3') {
          // listening to pubnub message
      // }
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
  clearMarkers(marker) {
      if (typeof marker !== 'undefined') {
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
    // this.marker.setMap(this.maps);
   }

  //  displayLocationInfo(position) {
  //   console.log(position);
  // }
}
