import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../../models/user.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input()
  userId: number;

  @Input()
  userName: string;

  @Input()
  text: string;

  @Input()
  dateEnvoi: string;

  @Input()
  pictureUrl: string;

  user: User;
  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
  }

}
