import {Component, DoCheck, Input, IterableDiffers, OnInit, ViewChild} from '@angular/core';
import {fromEvent, Observable, Subscription} from 'rxjs';

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

  constructor(private iterableDiffers: IterableDiffers) {
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

  }

  sendMessage() {
    const dateNow =  new Date();
    const newMessage = {
      id:7,
      dateEnvoi: dateNow.toLocaleString(),
      userId: 2,
      userName:'You',
      pictureUrl:'https://bootdey.com/img/Content/avatar/avatar3.png',
      text:this.message
    };

    this.messages.push(newMessage);
    this.messages.sort(function(a, b) {
      return b.id - a.id;
    });
    this.messageInput.nativeElement.value = '';
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
