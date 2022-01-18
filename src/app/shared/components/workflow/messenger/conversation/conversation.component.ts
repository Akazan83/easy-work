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
export class ConversationComponent implements OnInit{
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
  }

}
