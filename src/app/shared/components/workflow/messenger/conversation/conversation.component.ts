import {Component, DoCheck, Input, IterableDiffers, OnInit, ViewChild} from '@angular/core';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {User} from '../../../../models/user.model';
import {MessengerService} from '../../../../services/messenger/messenger.service';
import {Message} from '../../../../models/message.model';
import {UserService} from '../../../../services/user/user.service';
import {MessengerComponent} from '../messenger.component';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit, DoCheck {
  @ViewChild('messageInput') messageInput;
  @Input()
  messagesFrom: Message[];

  @Input()
  receiverId: string;

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
              private messengerService: MessengerService,
              private userService: UserService,
              private messengerComponent: MessengerComponent) {
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
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  sendMessage() {
    const dateNow =  new Date();

    const newMessage = new Message();
    newMessage.sendingDate = dateNow.toLocaleString();
    newMessage.senderId = this.currentUser.id;
    newMessage.receiverId = this.receiverId;
    newMessage.firstName = this.currentUser.firstName;
    newMessage.lastName = this.currentUser.lastName;
    newMessage.text = this.message;

    this.messageInput.nativeElement.value = '';

    const messageSent = new Promise((resolve => {
      this.messengerService.postNewMessage(newMessage);
      resolve(newMessage);
    }));

    messageSent.then((value => {

      if (value instanceof Message) {
        try {
          this.messengerComponent.messages.unshift(value);
        }catch (e) {
          console.log(e);
        }
      }
    }));

  }

  ngDoCheck() {
    this.messages = [];
    if(this.messagesFrom.length !== 0){
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
