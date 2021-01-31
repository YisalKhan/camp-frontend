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

  createCamp(data: any) {
    return this.httpClient.post(this.basicURL + '/camps', data);
  }

  getCamps(userID: any) {
    return this.httpClient.get(this.basicURL + '/camps?userID=' + userID);
  }

  viewCamp(campID: any) {
    return this.httpClient.get(this.basicURL + '/camps/' + campID);
  }

  campApprove(campID: any, userID: any, campDateTime: any) {
    return this.httpClient.get(this.basicURL + '/camp/approval/' + campID + '/' + userID + '?datetime=' + campDateTime);
  }

  getApprovedCamps(userID: any) {
    return this.httpClient.get(this.basicURL + '/approved/camps/' + userID);
  }

  addPatient(data: any) {
    // debugger;
    return this.httpClient.post(this.basicURL + '/patient/add', data);
  }

  getCampPermission(data: any) {
    return this.httpClient.post(this.basicURL + '/start/camp', data);
  }

  deleteCamp(campId: any) {
    return this.httpClient.delete(this.basicURL + '/camps/' + campId);
  }

  updateCamp(campId: any, data: any) {
    return this.httpClient.put(this.basicURL + '/camps/' + campId, data);
  }

  getFilteredCamps(data: any, userID: any) {
    return this.httpClient.post(this.basicURL + '/get/camps/present/' + userID, data);
  }

  getPreviousCamps() {
    return this.httpClient.post(this.basicURL + '/get/camps/present', {});
  }

  getFutureCamps(data: any) {
    return this.httpClient.post(this.basicURL + '/get/camps/present', data);
  }

  getSpoPastCamps(userID: any) {
    return this.httpClient.post(this.basicURL + '/get/camps/present/' + userID, {campReportType: 'previous'});
  }

  getSpoFutureCamps(data: any) {
    return this.httpClient.post(this.basicURL + '/get/camps/present/' + data['userID'], data);
  }

  getPatient(patientId: any) {
    return this.httpClient.get(this.basicURL + '/patient/' + patientId);
  }

  updatePatientDrugs(patientId: any, data: any) {
    return this.httpClient.post(this.basicURL + '/patient/drugs/add/' + patientId, data);
  }

  getRegions(teamID) {
    return this.httpClient.get(this.basicURL + '/regions/' + teamID);
  }

  getDistricts(regionID) {
    return this.httpClient.get(this.basicURL + '/districts/' + regionID);
  }

  getCclMedicine() {
    return this.httpClient.get(this.basicURL + '/get/ccl/medicines');
  }

  getOtherMedicine() {
    return this.httpClient.get(this.basicURL + '/get/other/medicines');
  }

  getCampStatsData(userID) {
    return this.httpClient.get(this.basicURL + '/get/camps/slips/' + userID, {});
  }

  closeCamp(camp_id, used_strips) {
    return this.httpClient.get(this.basicURL + '/close/camp/' + camp_id + '/' + used_strips, {});
  }
}
