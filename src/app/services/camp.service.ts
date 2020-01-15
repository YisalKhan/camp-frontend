import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalVariables } from '../common/global';

@Injectable({
  providedIn: 'root'
})
export class CampService {
  private basicURL = GlobalVariables.BASE_API_URL + '/api';

  constructor(
    private httpClient: HttpClient,
  ) { }

  createCamp(data) {
    return this.httpClient.post(this.basicURL + '/camps', data);
  }

  getCamps() {
    return this.httpClient.get(this.basicURL + '/camps');
  }

  viewCamp(campID) {
    return this.httpClient.get(this.basicURL + '/camps/' + campID);
  }

  campApprove(campID, userID) {
    return this.httpClient.get(this.basicURL + '/camp/approval/' + campID + '/' + userID);
  }

  getApprovedCamps(userID) {
    return this.httpClient.get(this.basicURL + '/approved/camps/' + userID);
  }

  addPatient(data) {
    debugger;
    return this.httpClient.post(this.basicURL + '/patient/add', data);
  }
}
