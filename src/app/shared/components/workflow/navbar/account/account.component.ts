import { Component, OnInit } from '@angular/core';
import {User} from '../../../../models/user.model';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {FileuploadingService} from '../../../../services/fileUpload/FileuploadingService';
import {Observable} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';
import {APP_CONFIG} from '../../../../../../environments/environment.web';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user: User;
  // FileUpload
  private selectedFiles?: FileList;
  private currentFile?: File;
  private progress = 0;
  private message = '';
  private pictureUrl;
  private fileInfos?: Observable<any>;

  constructor(
    private http: HttpClient,
    private fileuploadingService: FileuploadingService,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.pictureUrl = APP_CONFIG.apiUrl + '/images/'+ this.user.id+'.jpg';
  }

  // FileUpload
  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.fileuploadingService.upload(this.currentFile, this.user.id).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Impossible d\'envoyer la photo au serveur';
            }

            this.currentFile = undefined;
          });
      }

      this.selectedFiles = undefined;
    }
  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
