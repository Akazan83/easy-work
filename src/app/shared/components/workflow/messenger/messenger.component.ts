import {Component, OnInit} from '@angular/core';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user/user.service';
import {MessengerService} from '../../../services/messenger/messenger.service';
import {Message} from '../../../models/message.model';


@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {
  maxHeight: number;
  users: User[];
  currentUser: User;
  receiverId: number;
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  messages: Message[];

  constructor(private userService: UserService,
              private messengerService: MessengerService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
      this.maxHeight = innerHeight - 70;
    });
    this.maxHeight = innerHeight - 70;

    this.users = this.userService.users;
    this.users.sort((a,b) => b.id - a.id);
    this.loadMessages(this.users[0].id);
  }

  loadMessages(receiverId){
    this.messages = [];
    this.messengerService.getMessagesFromUserId(receiverId,this.currentUser.id)
      .subscribe(messages => {
      this.messages.push(...messages);
    });
    this.receiverId = receiverId;
  }

  onDestroy() {
    this.resizeSubscription$.unsubscribe();
  }

}
