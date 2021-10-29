import {Component, OnInit} from '@angular/core';
import {fromEvent, Observable, Subscription} from 'rxjs';


@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {
  maxHeight: number;
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  messages = [];

  constructor() { }

  ngOnInit(): void {
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
      this.maxHeight = innerHeight - 70;
    });
    this.maxHeight = innerHeight - 70;

    const dateNow =  new Date();
    const fakeMessage = {
      id:1,
      dateEnvoi: dateNow.getHours() + ':' + dateNow.getMinutes(),
      userId: 1,
      userName:'Sharon Lessman',
      pictureUrl:'https://bootdey.com/img/Content/avatar/avatar3.png',
      text:'Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.'
    };

    this.messages.push(fakeMessage);
  }

  counter(i: number) {
    return new Array(i);
  }

  loadMessages(usrId){
    this.messages = [];
    const dateNow =  new Date();
    const fakeMessage = {
      id:1,
      dateEnvoi: dateNow.getHours() + ':' + dateNow.getMinutes(),
      userId: usrId,
      userName:'Sharon Lessman',
      pictureUrl:'https://bootdey.com/img/Content/avatar/avatar3.png',
      text:'Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.' + usrId
    };

    this.messages.push(fakeMessage);
  }

  onDestroy() {
    this.resizeSubscription$.unsubscribe();
  }

}
