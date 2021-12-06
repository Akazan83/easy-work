import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TicketsService} from '../../../services/tickets/tickets.service';
import {TicketStateEnum} from '../ticket/ticketStateEnum';

@Component({
  selector: 'app-refused-tickets',
  templateUrl: './refused-tickets.component.html',
  styleUrls: ['./refused-tickets.component.scss']
})
export class RefusedTicketsComponent implements OnInit {
  tickets = [];
  ticketsNumber: number;
  page = 1;
  constructor(private http: HttpClient, private ticketService: TicketsService) { }

  ngOnInit(): void {
    this.tickets = this.ticketService.tickets.filter(function(ticket){
      return ticket.status === TicketStateEnum.refused;
    });
    this.ticketsNumber = this.tickets.length;
  }

  handlePageChange(event) {
    this.page = event;
  }

}
