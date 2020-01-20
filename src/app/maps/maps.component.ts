import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { PubNubAngular } from 'pubnub-angular2';

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
  constructor(pubnub: PubNubAngular) {
    pubnub.init({ publishKey: 'pub-c-02414160-d913-45c5-8531-0eaa1dffa163', subscribeKey: 'sub-c-1901bc68-330b-11ea-a820-f6a3bb2caa12' });
    this.pubnub = pubnub;
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
    // navigator.geolocation.watchPosition((data) => {
    //   console.log(data);
    //   // remove old marker
    //   const marker = new google.maps.Marker({
    //     position: new google.maps.LatLng(data.coords.latitude, data.coords.longitude),
    //     map: this.maps,
    //   });
    // });
    if (navigator) {
      const role_id = localStorage.getItem('userDesignation');
      const markers = [];
      if (role_id === '9') {
          navigator.geolocation.watchPosition((data) => {
              const lat_lng = {
                  'lat': data.coords.latitude,
                  'lng': data.coords.longitude
              };
              // publishing on pubnub channel
              this.pubnub.publish({ channel: 'myChannel', message: lat_lng }, (response) => {
                  console.log(response);
              });
          });
      } else if (role_id === '1' || role_id === '2' || role_id === '3') {
          // listening to pubnub message
          this.pubnub.subscribe({ channels: ['myChannel'], triggerEvents: true, withPresence: true });
          this.pubnub.getMessage('myChannel', (msg) => {
              // console.log(msg);
              this.clearMarkers(markers);
              const marker = new google.maps.Marker({
                position: new google.maps.LatLng(msg.message.lat, msg.message.lng),
                map: this.maps,
              });
              markers.push(marker);
          });
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
  }
}

  // trackLocation ({onSuccess, onError = () => {} }) {
  //   if ('geolocation' in navigator === false) {
  //     return onError();
  //   }
  //   // console.log(navigator.geolocation.watchPosition(onSuccess, onError));
  //   return navigator.geolocation.watchPosition(onSuccess, onError);
  // }
  clearMarkers(markers) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
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
