import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user.model';
import {APP_CONFIG} from '../../../environments/environment.web';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: Observable<User>;
  private baseUrl = APP_CONFIG.apiUrl + '/api/auth';
  private currentUserSubject: BehaviorSubject<User>;


  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public register(firstName: string, lastName: string, email: string, password: string){
    return this.httpClient.post(`${this.baseUrl}/signup`, {firstName, lastName, email, password});
  }

  public login(email: string, password: string) {
    return this.httpClient.post<User>(`${this.baseUrl}/signin`, {email, password})
      .pipe(
        map(userData => {
        sessionStorage.setItem('currentUser', JSON.stringify(userData));
        sessionStorage.setItem('token', 'Bearer ' + userData.token);
        this.currentUserSubject.next(userData);
        return userData;
      })
      );
  }

  public logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
