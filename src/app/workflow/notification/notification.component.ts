import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input()
  id: number;

  @Input()
  title: string;

  @Input()
  link: string;

  @Input()
  creationDate: string;

  @Input()
  icon: string;

  @Input()
  bg: string;

  constructor() { }

  ngOnInit(): void {
  }
}
