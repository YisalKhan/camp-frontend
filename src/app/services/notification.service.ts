import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariables } from '../common/global';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private basicURL = GlobalVariables.BASE_API_URL + '/api';

  constructor(
    private httpClient: HttpClient
  ) { }

  getUnreadNotifications(id: any) {
    return this.httpClient.get(this.basicURL + '/get/notifications/unread/' + id);
  }

  markAsReadNotification(userID: any) {
    return this.httpClient.get(this.basicURL + '/notification/mark/read/' + userID);
  }
}
