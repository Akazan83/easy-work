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
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;
  notifications: Notification[] = [];
  messages: Message[];

  constructor(private userService: UserService,
              private messengerService: MessengerService,
              private notificationsService: NotificationsService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe( () => {
      this.maxHeight = innerHeight - 70;
    });
    this.maxHeight = innerHeight - 70;

    this.notifications = this.notificationsService.notification;

    this.subscribeToNotifications();
    this.userService.getAllUsers().subscribe(users => {
      users.map(user => {
        if(user.id !== this.currentUser.id){
          this.users.push(user);
        }
      });
      this.loadMessages(this.users[1].id, this.currentUser.id);

      this.users.forEach(user => {
        this.countNewMessages(user.id,this.currentUser.id);
        //TODO: A remettre
        //this.countNewMessages(user.id,this.currentUser.id).subscribe(x => console.log(x));
        this.countNewMessages('61db5a373240426ebbf177f3','61db59e13240426ebbf177f2').subscribe(x => console.log(x));
      });
    });
  }

  subscribeToNotifications(){
    this.notificationsService.notificationObservable.subscribe(notification => {
      this.notifications.push(notification);
      console.log(notification);
      console.log(this.notifications);
      console.log(this.notifications.filter(message => message.senderId === '61db5a373240426ebbf177f3'));
    });
  }

  loadMessages(receiverId: string,currentUserId: string){
    this.messages = [];
    this.messengerService.getMessagesFromUser(receiverId,currentUserId)
      .subscribe(messages => {
        this.messages.push(...messages);
        console.log(messages);
      });
  }

  countNewMessages(senderId: string,recipientId: string): Observable<number> {
    return this.messengerService.countNewMessages(senderId,recipientId);
  }

  getNotificationByUser(userId: string){
    return this.notifications.filter(message => message.senderId === userId).length;
  }
}
