import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TicketsService} from '../../../services/tickets/tickets.service';
import {TicketStateEnum} from '../ticket/ticketStateEnum';
import {Ticket} from '../../../models/ticket.model';

@Component({
  selector: 'app-validate-tickets',
  templateUrl: './validate-tickets.component.html',
  styleUrls: ['./validate-tickets.component.scss']
})
export class ValidateTicketsComponent implements OnInit {
  ticketsNumber: number;
  tickets: Ticket[];
  page = 1;

  constructor(private http: HttpClient, private ticketService: TicketsService) { }

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(ticket => {
      this.tickets = ticket;
      this.ticketsNumber = this.tickets.length;
    });
  }

  handlePageChange(event) {
    this.page = event;
  }
}
