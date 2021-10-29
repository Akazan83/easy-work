import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TicketsService} from '../../../../services/tickets/tickets.service';
import {Ticket} from '../../../models/ticket.model';

@Component({
  selector: 'app-waiting-tickets',
  templateUrl: './waiting-tickets.component.html',
  styleUrls: ['./waiting-tickets.component.scss']
})
export class WaitingTicketsComponent implements OnInit {
  page = 1;
  ticketsNumber: number;
  tickets: Ticket[];

  constructor(private http: HttpClient, private ticketService: TicketsService) { }

  ngOnInit(): void {
    this.ticketService.getTickets('En attente').subscribe(tickets => {
      this.tickets = tickets;
      this.ticketsNumber = tickets.length;
    });
  }

  handlePageChange(event) {
    this.page = event;
  }

}
