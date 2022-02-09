import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TicketsService} from '../../../services/tickets/tickets.service';
import {Ticket} from '../../../models/ticket.model';
import {TicketStateEnum} from '../ticket/ticketStateEnum';
import {NotificationsService} from '../../../services/notification/notifications.service';

@Component({
  selector: 'app-waiting-tickets',
  templateUrl: './waiting-tickets.component.html',
  styleUrls: ['./waiting-tickets.component.scss']
})
export class WaitingTicketsComponent implements OnInit {
  page = 1;
  ticketsNumber: number;
  tickets: Ticket[] = [];

  constructor(private http: HttpClient,
              private ticketService: TicketsService,
              private not: NotificationsService) { }

  ngOnInit(): void {
    this.getTickets(0);
    this.not.init();
  }

  handlePageChange(event) {
    if(event > this.page){
      this.getTickets(this.page);
    }
    this.page = event;
  }

  private getTickets(page: number){
    this.ticketService.getTicketsByStatus(TicketStateEnum.waiting,page).subscribe(tickets => {
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
