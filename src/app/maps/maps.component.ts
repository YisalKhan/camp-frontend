import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit, AfterViewInit {

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  maps: google.maps.Map;
  watcher: any;

  // lat = 31.518875299999998;
  // lng = 74.3082251;
  // marker: any;
  constructor() {
  }
  lat: any = localStorage.getItem('latitude');
  lng: any = localStorage.getItem('longitude');
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 19,
  };
  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.maps,
  });

  ngOnInit() {
    navigator.geolocation.watchPosition((data) => {
      console.log(data);
      // remove old marker
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(data.coords.latitude, data.coords.longitude),
        map: this.maps,
      });
    });
    // this.trackLocation({
    //   onSuccess: ({ coords: { latitude: lat, longitude: lng } }) => {
    //     console.log(lat);
    //     this.marker.setPosition({ lat, lng });
    //     // this.maps.panTo({ lat, lng });
    //   },
    //   // onError: err =>
    //   //   console.log(err)
    // });
  }

  // trackLocation ({onSuccess, onError = () => {} }) {
  //   if ('geolocation' in navigator === false) {
  //     return onError();
  //   }
  //   // console.log(navigator.geolocation.watchPosition(onSuccess, onError));
  //   return navigator.geolocation.watchPosition(onSuccess, onError);
  // }

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
