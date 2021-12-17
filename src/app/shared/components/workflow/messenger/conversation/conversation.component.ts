import {Component, DoCheck, Input, IterableDiffers, OnInit, ViewChild} from '@angular/core';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {User} from '../../../../models/user.model';
import {MessengerService} from '../../../../services/messenger/messenger.service';
import {Message} from '../../../../models/message.model';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit, DoCheck {
  @ViewChild('messageInput') messageInput;
  @Input()
  messagesFrom: [];

  maxHeight: number;
  maxWidth: number;

  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  messages = [];
  message: string;
  differ: any;
  user: User;

  constructor(private iterableDiffers: IterableDiffers,
              private messengerService: MessengerService) {
    this.differ = iterableDiffers.find([]).create(null);
  }

  ngOnInit(): void {
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
      this.maxHeight = innerHeight - 180;
      this.maxWidth = innerWidth - 120;
    });
    this.maxHeight = innerHeight - 180;
    this.maxWidth = innerWidth - 120;
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  sendMessage() {
    const dateNow =  new Date();

    const newMessage = new Message();
    newMessage.dateEnvoi = dateNow.toLocaleString();
    newMessage.userId = this.user.id;
    newMessage.userName = this.user.firstName;
    newMessage.text = this.message;

    this.messages.push(newMessage);
    this.messageInput.nativeElement.value = '';
    this.messengerService.postNewMessage(newMessage);

    this.messages.sort(function(a, b) {
      return b.id - a.id;
    });
  }

  ngDoCheck() {
    this.messages = [];
    this.messages = this.messagesFrom;
    this.messages.sort(function(a, b) {
      return b.id - a.id;
    });
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
