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

  createUser(data: any) {
    return this.httpClient.post(this.basicURL + '/users', data);
  }

  getUsers() {
    return this.httpClient.get(this.basicURL + '/users');
  }

  getEditUser(uid: any) {
    return this.httpClient.get(this.basicURL + '/users/' + uid);
  }

  updateUser(uid: any, data: any) {
    return this.httpClient.put(this.basicURL + '/users/' + uid, data);
  }

  getRegions() {
    return this.httpClient.get(this.basicURL + '/regions');
  }

  getDistricts(regionID) {
    return this.httpClient.get(this.basicURL + '/districts/' + regionID);
  }

  getTerritories(districtID) {
    return this.httpClient.get(this.basicURL + '/territories/' + districtID);
  }

  deleteUser(userId) {
    return this.httpClient.delete(this.basicURL + '/users/' + userId);
  }

  getFilterDistricts() {
    return this.httpClient.get(this.basicURL + '/filter/districts');
  }

  getFilterTerritories() {
    return this.httpClient.get(this.basicURL + '/filter/territories');
  }

  getFilterUsers(data) {
    return this.httpClient.post(this.basicURL + '/get/users/report', data);
  }

  getDoctors(data) {
    return this.httpClient.post(this.basicURL + '/get/doctors/report', data);
  }

  getAllPatients(data) {
    return this.httpClient.post(this.basicURL + '/get/patients/report', data);
  }
}
