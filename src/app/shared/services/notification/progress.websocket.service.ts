import {Injectable} from '@angular/core';
import { InjectableRxStompConfig, RxStompService } from '@stomp/ng2-stompjs';
import {WebSocketOptions} from '../../models/webSocket/websocket.options';
import {WebsocketService} from './websocket.service';

export const progressStompConfig: InjectableRxStompConfig = {
  webSocketFactory: () => new WebSocket('ws://localhost:8080/ws')
};

@Injectable({
  providedIn: 'root'
})
export class ProgressWebsocketService extends WebsocketService {

  constructor(stompService: RxStompService) {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    console.log(currentUser.id);
    super(
          stompService,
          progressStompConfig,
          new WebSocketOptions( '/user/'+ currentUser.id + '/queue/messages')
      );
  }
}
