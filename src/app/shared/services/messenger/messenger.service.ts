import {Injectable} from '@angular/core';
import {ProgressWebsocketService} from '../notification/progress.websocket.service';
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
  constructor(private progressWebsocketService: ProgressWebsocketService,
              private httpClient: HttpClient) { }

  /**
   * Init Progress WebSocket.
   */
  public init(){
    this.initProgressWebSocket();
  }


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

  /**
   * Subscribe to the client broker.
   * Return the current status of the batch.
   */
  private initProgressWebSocket = () => {
    const obs = this.progressWebsocketService.getObservable();

    obs.subscribe({
      next: this.onNewProgressMsg,
      error: err => {
        console.log(err);
      }
    });
  };

  /**
   * Apply result of the java server notification to the view.
   */
  private onNewProgressMsg = receivedMsg => {
    if (receivedMsg.type === 'SUCCESS') {
      this.notification.push(new Notification().deserialize(receivedMsg.message));
      console.log(this.notification);
    }
  };
}
