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
    this.ticketService.getTicketsByStatus(TicketStateEnum.approved,page).subscribe(tickets => {
      if(tickets === null){
        return;
      }
      tickets.map(ticket => {
        if(!this.ticketExists(ticket.id)){
          this.tickets.push(ticket);
        }
      });

      if (this.tickets != null){
        this.ticketsNumber = this.tickets.length;
      }
    });
  }

  private ticketExists(id) {
    return this.tickets.some(function(ticket) {
      return ticket.id === id;
    });
  }
}
