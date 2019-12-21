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
}
