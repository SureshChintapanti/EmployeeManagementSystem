import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDialogService } from './common-dialog.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonSingletonService {
  protected baseUrl: string = environment.baseUrl;
  constructor(
    private router: Router,
    private commonDialogService: CommonDialogService, public http: HttpClient
  ) { }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  showNotification(message: string) {
    this.commonDialogService.showAlert("Notification", message);
  }

  getData(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  post(endpoint: string, obj: any): Observable<any> {
    const url = `${this.baseUrl}${endpoint}`;
    return this.http.post<any>(url, obj);
  }
}
