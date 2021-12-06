import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TicketsService} from '../../../services/tickets/tickets.service';
import {TicketStateEnum} from '../ticket/ticketStateEnum';

@Component({
  selector: 'app-validate-tickets',
  templateUrl: './validate-tickets.component.html',
  styleUrls: ['./validate-tickets.component.scss']
})
export class ValidateTicketsComponent implements OnInit {
  ticketsNumber: number;
  tickets = [];
  page = 1;
  constructor(private http: HttpClient, private ticketService: TicketsService) { }

  ngOnInit(): void {
    this.tickets = this.ticketService.tickets.filter(function(ticket){
      return ticket.status === TicketStateEnum.approved;
    });
    this.ticketsNumber = this.tickets.length;
  }

  handlePageChange(event) {
    this.page = event;
  }
}
