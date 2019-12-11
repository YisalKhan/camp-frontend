import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { GlobalVariables } from '../common/global';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private basicURL = GlobalVariables.BASE_API_URL + '/api';

  constructor(
    private httpClient: HttpClient
  ) { }

  userLogin(data: any) {
    // debugger;
    return this.httpClient.post(this.basicURL + '/login', data);
  }
}
