import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  @Input()
  title: string;

  @Input()
  status: string;

  @Input()
  reference: string;

  @Input()
  creationDate: string;

  @Input()
  endDate: string;

  constructor() { }

  ngOnInit(): void {
  }

}
