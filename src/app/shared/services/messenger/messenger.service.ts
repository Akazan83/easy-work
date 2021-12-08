import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Message} from '../../models/message.model';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  messages: Message[];
  constructor(private httpClient: HttpClient) { }

  getMessagesFromUserId(id: number): Observable<Message>{
    return this.httpClient.get<Message[]>(`/api/messages/${id}`).pipe(
      map(message =>  new Message().deserialize(message)),
      catchError(() => throwError('Ticket not found'))
    );
  }

  postNewMessage(id: number, dateEnvoi: string, userId: string, userName: string, text: string){
    const message = new Message();
    message.id = id;
    message.dateEnvoi = dateEnvoi;
    message.userId = userId;
    message.userName  = userName;
    message.text = text;

    return this.httpClient.post<Message>(`/api/message/`, message).pipe(map(data => data));
  }

}
