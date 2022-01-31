import {Observable} from 'rxjs';
import {InjectableRxStompConfig, RxStompService} from '@stomp/ng2-stompjs';
import {WebSocketOptions} from '../../models/webSocket/websocket.options';
import {SocketResponse} from '../../models/webSocket/websocket.response';
import {Message} from '../../models/message.model';

export class WebsocketService {
  private obsStompConnection: Observable<any>;
  private subscriber: any;
  private stompConfig: InjectableRxStompConfig = {
    heartbeatIncoming: 0,
    heartbeatOutgoing: 20000,
    reconnectDelay: 10000,
    debug: (str) => { console.log('Console : ' + str); }
  };

  constructor(
    private stompService: RxStompService,
    private updatedStompConfig: InjectableRxStompConfig,
    private options: WebSocketOptions
  ) {
    // Update StompJs configuration.
    this.stompConfig = {...this.stompConfig, ...this.updatedStompConfig};
    // Initialise a list of possible subscribers.
    this.createObservableSocket();
    // Activate subscription to broker.
    this.connect();
  }


  /**
   * Return an observable containing a subscribers list to the broker.
   */
  public getObservable = () => this.obsStompConnection;

  public sendMessage(message: Message){
    this.stompService.stompClient.publish({destination: '/app/chat', body: JSON.stringify(message)});
  }

  private createObservableSocket = () => {
    this.obsStompConnection = new Observable(observer => {
      this.subscriber = observer;
    });
  };

  /**
   * Connect and activate the client to the broker.
   */
  private connect = () => {
    // @ts-ignore
    this.stompService.stompClient.configure(this.stompConfig);
    this.stompService.stompClient.onConnect = this.onSocketConnect;
    this.stompService.stompClient.onStompError = this.onSocketError;
    this.stompService.stompClient.activate();
  };

  /**
   * On each connect / reconnect, we subscribe all broker clients.
   */
  private onSocketConnect = () => {
    this.stompService.stompClient.subscribe(this.options.brokerEndpoint, this.socketListener);
  };

  private onSocketError = errorMsg => {
    console.log('Broker reported error: ' + errorMsg);

    const response: SocketResponse = {
      type: 'ERROR',
      message: errorMsg
    };
    this.subscriber.error(response);

  };

  private socketListener = frame => {
    this.subscriber.next(this.getMessage(frame));
  };

  private getMessage = data => {
    const response: SocketResponse = {
      type: 'SUCCESS',
      message: JSON.parse(data.body)
    };
    console.log(JSON.parse(data.body));
    return response;
  };
}
