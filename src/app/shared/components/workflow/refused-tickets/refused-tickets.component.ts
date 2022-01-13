import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TicketsService} from '../../../services/tickets/tickets.service';
import {TicketStateEnum} from '../ticket/ticketStateEnum';
import {Ticket} from '../../../models/ticket.model';

@Component({
  selector: 'app-refused-tickets',
  templateUrl: './refused-tickets.component.html',
  styleUrls: ['./refused-tickets.component.scss']
})
export class RefusedTicketsComponent implements OnInit {
  tickets: Ticket[] = [];
  ticketsNumber: number;
  page = 1;

  constructor(private http: HttpClient, private ticketService: TicketsService) { }

  ngOnInit(): void {
    this.getTickets(0);
  }

  handlePageChange(event) {
    if(event > this.page){
      this.getTickets(this.page);
    }
    this.page = event;
  }
  private getTickets(page: number){
    this.ticketService.getTicketsByStatus(TicketStateEnum.refused,page).subscribe(tickets => {
      tickets.map(ticket => {

        if (this.tickets != null && !this.ticketExists(ticket.id)){
            this.tickets.push(ticket);
            this.ticketsNumber = this.tickets.length;
        }
      });

    });
  }

  private ticketExists(id) {
    return this.tickets.some(function(ticket) {
      return ticket.id === id;
    });
  }

}
