import {Component, OnInit} from '@angular/core';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user/user.service';
import {Message} from '../../../models/message.model';
import {MessengerService} from '../../../services/messenger/messenger.service';


@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {
  maxHeight: number;
  users: User[] = [];
  currentUser: User;
  receiverId: string;
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  messages: Message[];

  constructor(private userService: UserService, private messenger: MessengerService) { }

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
      this.loadMessages(this.users[0].id, this.currentUser.id);
    });

    this.messenger.init();
  }

  loadMessages(receiverId,currentUserId){
    this.messages = [];
    this.messenger.getMessagesFromUser(receiverId,currentUserId)
      .subscribe(messages => {
        this.messages.push(...messages);
        console.log(messages);
      });
    this.receiverId = receiverId;


    console.log(this.messenger.notification[0].senderId);
  }
}
