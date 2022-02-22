import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {APP_CONFIG} from '../../../../environments/environment.web';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[];
  constructor(private httpClient: HttpClient) { }

  init(){
    return new Promise<void>((resolve) => {
      this.getAllUsers().subscribe(users => {
        this.users = users;
        resolve();
      });
    });
  }

  public getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(APP_CONFIG.apiUrl + `/api/user/getAll`).pipe(
      map(data => data.map(users => new User().deserialize(users)))
    );
  }
}
