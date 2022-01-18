import {Injectable, OnInit} from '@angular/core';
import {ProgressWebsocketService} from './progress.websocket.service';

@Injectable({
  providedIn: 'root'
})
export class MessengerService  implements OnInit{
  public progress: any = {};
  constructor(private progressWebsocketService: ProgressWebsocketService) { }


  // eslint-disable-next-line @angular-eslint/contextual-lifecycle
  ngOnInit() {
    // Init Progress WebSocket.
    this.initProgressWebSocket();
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
      this.progress = receivedMsg.message;

    }
  };

}
