import {Injectable} from '@angular/core';
import {Message} from '../../models/message.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Notification} from '../../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  public notification: Notification[] = [];
  constructor(private httpClient: HttpClient) { }

  public getMessagesFromUser(sender,receiver): Observable<Message[]> {
    return this.httpClient.get<Message[]>(`http://localhost:8080/messages/${sender}/${receiver}`).pipe(
      map(messages => {
        if(messages != null){
          return messages.map(message => new Message().deserialize(message));
        }
        return null;
      })
    );
  }

  public countNewMessages(senderId,recipientId): Observable<number> {
    return this.httpClient.get<number>(`http://localhost:8080/messages/${senderId}/${recipientId}/count`);
  }
}
