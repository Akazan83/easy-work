import {Injectable} from '@angular/core';
import { InjectableRxStompConfig, RxStompService } from '@stomp/ng2-stompjs';
import {WebSocketOptions} from '../../models/webSocket/websocket.options';
import {WebsocketService} from './websocket.service';
import {APP_CONFIG} from '../../../../environments/environment.web';

export const progressStompConfig: InjectableRxStompConfig = {
  webSocketFactory: () => new WebSocket( APP_CONFIG.wsUrl)
};

@Injectable({
  providedIn: 'root'
})
export class ProgressWebsocketService extends WebsocketService {

  constructor(stompService: RxStompService) {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    super(
          stompService,
          progressStompConfig,
          new WebSocketOptions( '/user/'+ currentUser.id + '/queue/messages')
      );
  }
}
