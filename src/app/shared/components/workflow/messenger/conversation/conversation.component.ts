import {Component, DoCheck, Input, IterableDiffers, OnInit, ViewChild} from '@angular/core';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {User} from '../../../../models/user.model';
import {Message} from '../../../../models/message.model';
import {UserService} from '../../../../services/user/user.service';
import {ProgressWebsocketService} from '../../../../services/notification/progress.websocket.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit, DoCheck  {

  @Input()
  messagesFrom: Message[];

  @Input()
  receiverUser: User;

  messageInput = '';

  maxHeight: number;
  maxWidth: number;

  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  messages: Message[] ;
  message: string;
  differ: any;
  currentUser: User;
  users: User[] = [];

  constructor(private iterableDiffers: IterableDiffers,
              private userService: UserService,
              private progressWebsocketService: ProgressWebsocketService) {
    this.differ = iterableDiffers.find([]).create(null);
  }

  ngOnInit(): void {
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe( () => {
      this.maxHeight = innerHeight - 180;
      this.maxWidth = innerWidth - 120;
    });
    this.maxHeight = innerHeight - 180;
    this.maxWidth = innerWidth - 120;
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  }

  ngDoCheck() {
    this.messages = [];
    if(this.messagesFrom !== null){
      this.messages = this.messagesFrom;
    }
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  sendMessage(content: string) {
    const message = new Message();
    message.content = content;
    message.senderId = this.currentUser.id;
    message.senderName = this.currentUser.firstName;
    message.recipientName = this.receiverUser.firstName;
    message.recipientId = this.receiverUser.id;
    message.timestamp = new Date();
    this.progressWebsocketService.sendMessage(message);

    this.messages.unshift(message);
    this.messageInput = '';
  }
}
