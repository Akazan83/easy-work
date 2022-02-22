import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {APP_CONFIG} from '../../../../environments/environment.web';

@Injectable({
  providedIn: 'root'
})
export class FileuploadingService {
  private baseUrl = APP_CONFIG.apiUrl + '/api/file';

  constructor(private httpClient: HttpClient) {}

  upload(file: File, userId: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    const fileExtension = file.name.split('?')[0].split('.').pop();

    formData.append('file', file, userId+'.'+fileExtension);
    formData.append('ticketId',userId);

    const request = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.httpClient.request(request);
  }

  getFiles(userId: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/getFiles/${userId}`);
  }

  downloadFile(userId: string,fileName: string){
    // eslint-disable-next-line @typescript-eslint/naming-convention
    return this.httpClient.get(`${this.baseUrl}/files/${userId}/${fileName}`);
  }
}
