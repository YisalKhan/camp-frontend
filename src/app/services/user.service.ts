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

  getUsers(userID) {
    return this.httpClient.get(this.basicURL + '/users?userID=' + userID);
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

  getFilterUsers(data, userID) {
    return this.httpClient.post(this.basicURL + '/get/users/report/' + userID, data);
  }

  getDoctors(data) {
    return this.httpClient.post(this.basicURL + '/get/doctors/report', data);
  }

  getAllPatients(data) {
    return this.httpClient.post(this.basicURL + '/get/patients/report', data);
  }

  updatePassword(data) {
    return this.httpClient.post(this.basicURL + '/password/reset', data);
  }

  onForgetPassword(data: any) {
    return this.httpClient.post(this.basicURL + '/password/create', data);
  }

  tokenVerification(token: any) {
    return this.httpClient.get(this.basicURL + '/password/find/' + token);
  }

  onResetPassword(data: any) {
    return this.httpClient.post(this.basicURL + '/password/reset', data);
  }
}
