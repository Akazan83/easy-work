import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public register(firstName: string, lastName: string, email: string, password: string){
    return this.httpClient.post(`http://localhost:8080/api/auth/signup`, {firstName, lastName, email, password});
  }

  public login(email: string, password: string) {
    return this.httpClient.post<User>(`http://localhost:8080/api/auth/signin`, {email, password})
      .pipe(
        map(userData => {
        localStorage.setItem('currentUser', JSON.stringify(userData));

        localStorage.setItem('token', 'Bearer ' + userData.accessToken);
        this.currentUserSubject.next(userData);

        return userData;
      })
      );
  }

  public logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
