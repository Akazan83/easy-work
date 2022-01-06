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

  public getMessagesFromUserId(receiverId: number, senderId: number): Observable<Message[]>{
    return this.httpClient
      .get<Message[]>(`/api/messages?receiverId=${receiverId}&senderId=${senderId}&receiverId=${senderId}&senderId=${receiverId}`)
      .pipe(map(data =>  data.map(message => new Message()
          .deserialize(message))),catchError(() => throwError('Messages not found'))
    );
  }

  public postNewMessage(newMessage: Message){
    return this.httpClient.post<Message>(`/api/messages/`, newMessage)
      .pipe(map(data => data)).subscribe(data => this.getMessagesFromUserId(data.receiverId, data.senderId));
  }

}
