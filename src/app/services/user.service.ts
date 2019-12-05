import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalVariables } from '../common/global';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private basicURL = GlobalVariables.BASE_API_URL + '/api';

  constructor(
    private httpClient: HttpClient
  ) { }

  getUserRoles() {
    return this.httpClient.get(this.basicURL + '/roles');
  }

  getUserTeams() {
    return this.httpClient.get(this.basicURL + '/teams');
  }
}
