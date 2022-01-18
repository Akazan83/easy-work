import {Injectable, OnInit} from '@angular/core';
import {ProgressWebsocketService} from './progress.websocket.service';
import {RxStompService} from '@stomp/ng2-stompjs';
import {User} from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MessengerService  implements OnInit {
  public progress: any = {};
  test: ProgressWebsocketService;
  currentUser: User;
  stompService: RxStompService;
  constructor(/*private progressWebsocketService: ProgressWebsocketService*/) { }


  // eslint-disable-next-line @angular-eslint/contextual-lifecycle
  ngOnInit() {
    this.stompService = new RxStompService();
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  }

  public createStomp(url: string){
    this.test = new ProgressWebsocketService(this.stompService,url);
    // Init Progress WebSocket.
    this.initProgressWebSocket();
  }

  /**
   * Subscribe to the client broker.
   * Return the current status of the batch.
   */
  private initProgressWebSocket = () => {
    const obs = this.test.getObservable();

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
      this.progress = receivedMsg.message;
    }
  };

}
