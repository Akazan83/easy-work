import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input()
  id: string;

  @Input()
  title: string;

  @Input()
  link: string;

  @Input()
  occurence: number;

  @Input()
  senderName: string;

  @Input()
  type: string;

  @Input()
  creationDate: Date;

  constructor() { }

  ngOnInit(): void {
  }
}
