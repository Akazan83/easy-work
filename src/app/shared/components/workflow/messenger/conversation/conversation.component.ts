import {Component, Input, IterableDiffers, OnInit, ViewChild} from '@angular/core';
import {fromEvent, Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
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

  sendMessage() {
    const dateNow =  new Date();
    const fakeMessage = {
      id:2,
      dateEnvoi: dateNow.getHours() + ':' + dateNow.getMinutes(),
      userId: 2,
      userName:'You',
      pictureUrl:'https://bootdey.com/img/Content/avatar/avatar3.png',
      text:this.message
    };

    this.messages.push(fakeMessage);
    this.messages.sort(function(a, b) {
      return b.id - a.id;
    });
    this.messageInput.nativeElement.value = '';
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
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
