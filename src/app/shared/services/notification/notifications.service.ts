import {Injectable} from '@angular/core';
import {ProgressWebsocketService} from './progress.websocket.service';
import {BehaviorSubject} from 'rxjs';
import {Notification} from '../../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  public notification: Notification[] = [];
  private messageSource = new BehaviorSubject<Notification>(null);
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public notificationObservable = this.messageSource.asObservable();
  constructor(private progressWebsocketService: ProgressWebsocketService) { }

  /**
   * Init Progress WebSocket.
   */
  public init(){
    this.initProgressWebSocket();
  }

  /**
   * Subscribe to the client broker.
   * Return the current status of the batch.
   */
  initProgressWebSocket = () => {
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
  private onNewProgressMsg = receivedNotification => {
    if (receivedNotification.type === 'SUCCESS') {
      this.notification.push(new Notification().deserialize(receivedNotification.message));
      this.messageSource.next(new Notification().deserialize(receivedNotification.message));
      console.log(this.notification);
      console.log(this.messageSource);
    }
  };

}
