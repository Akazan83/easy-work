import {Component, OnInit} from '@angular/core';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user/user.service';
import {MessengerService} from '../../../services/messenger/messenger.service';


@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {
  maxHeight: number;
  users: User[];
  currentUser: User;
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  messages = [];

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

  loadMessages(usrId){
    this.messages = [];
    this.messengerService.getMessagesFromUserId(usrId)
      .subscribe(message => {
      this.messages.push(message);
        console.log(message.id);
    });

  }

  onDestroy() {
    this.resizeSubscription$.unsubscribe();
  }

}
