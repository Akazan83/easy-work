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
  constructor() { }

  ngOnInit(): void {
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
      this.maxHeight = innerHeight - 70;
    });
    this.maxHeight = innerHeight - 70;
  }

  counter(i: number) {
    return new Array(i);
  }

  onDestroy() {
    this.resizeSubscription$.unsubscribe();
  }

}
