import {Component, DoCheck, Input, IterableDiffers, OnInit, ViewChild} from '@angular/core';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {User} from '../../../../models/user.model';
import {Message} from '../../../../models/message.model';
import {UserService} from '../../../../services/user/user.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit, DoCheck  {
  @ViewChild('messageInput') messageInput;
  @Input()
  messagesFrom: Message[];

  maxHeight: number;
  maxWidth: number;

  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  messages: Message[] ;
  message: string;
  differ: any;
  currentUser: User;
  users: User[];

  constructor(private iterableDiffers: IterableDiffers,
              private userService: UserService) {
    this.differ = iterableDiffers.find([]).create(null);
  }

  ngOnInit(): void {
    this.users = this.userService.users;
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe( () => {
      this.maxHeight = innerHeight - 180;
      this.maxWidth = innerWidth - 120;
    });
    this.maxHeight = innerHeight - 180;
    this.maxWidth = innerWidth - 120;
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    const message = new Message();
    message.content = 'dz';
    message.senderName = 'dz';
    message.recipientId = 'dz';
    message.id = 'dz';
    message.chatId = 'dz';
    message.timestamp = new Date();
    message.recipientName = 'dz';
    message.senderId = 'dz';
    //this.messenger.
  }

  ngDoCheck() {
    this.messages = [];
    if(this.messagesFrom !== null){
      this.messages = this.messagesFrom;
      /*    this.messages.sort(function(a, b) {
            return b.id - a.id;
          });*/
    }
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

}
