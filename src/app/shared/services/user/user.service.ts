import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[];
  constructor(private httpClient: HttpClient) { }

  init(){
    return new Promise<void>((resolve, reject) => {
      this.getAllUsers().subscribe(users => {
        this.users = users;
        resolve();
      });
    });
  }

  public getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`http://localhost:8080/api/test/users`).pipe(
      map(data => data.map(users => new User().deserialize(users)))
    );
  }
}
