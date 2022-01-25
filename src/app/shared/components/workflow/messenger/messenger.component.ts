import {Component, OnInit} from '@angular/core';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user/user.service';
import {Message} from '../../../models/message.model';
import {NotificationsService} from '../../../services/notification/notifications.service';
import {Notification} from '../../../models/notification.model';
import {MessengerService} from '../../../services/messenger/messenger.service';


@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss'],
})
export class MessengerComponent implements OnInit {
  maxHeight: number;
  users: User[] = [];
  currentUser: User;
  receiverUser: User;
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;
  notifications: Notification[] = [];
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
      users.map(user => {
        if(user.id !== this.currentUser.id){
          this.users.push(user);
        }
      });
      this.loadMessages(this.users[0], this.currentUser.id);
    });
  }

  loadMessages(receiver: User,currentUserId: string){
    this.messages = [];
    this.receiverUser = receiver;
    this.messengerService.getMessagesFromUser(receiver.id,currentUserId)
      .subscribe(messages => {
        this.messages.push(...messages);
      });
  }

  getNotificationByUser(userId: string){
    return this.notifications.filter(message => message.senderId === userId).length;
  }
}
