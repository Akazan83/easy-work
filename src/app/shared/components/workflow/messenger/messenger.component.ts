import {Component, OnInit} from '@angular/core';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user/user.service';
import {Message} from '../../../models/message.model';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {MessengerService} from "../../../services/messenger/messenger.service";


@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {
  maxHeight: number;
  users: User[];
  currentUser: User;
  receiverId: string;
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  messages: Message[];

  constructor(private userService: UserService,
              private messengerService: MessengerService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe( () => {
      this.maxHeight = innerHeight - 70;
    });
    this.maxHeight = innerHeight - 70;

    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
    this.messengerService.ngOnInit();
  }

  loadMessages(currentUser: string, recipientUser: string){
    this.messengerService.createStomp('/user/'+ currentUser + '/queue/messages');
  }

}
