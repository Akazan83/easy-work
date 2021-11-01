import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user.model';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

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

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`/api/users`).pipe(
      map(data => data.map(users => new User().deserialize(users)))
    );
  }
}
