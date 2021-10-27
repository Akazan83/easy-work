import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TicketsService} from "../../services/tickets/tickets.service";

@Component({
  selector: 'app-refused-tickets',
  templateUrl: './refused-tickets.component.html',
  styleUrls: ['./refused-tickets.component.scss']
})
export class RefusedTicketsComponent implements OnInit {
  tickets = [];
  page = 1;
  constructor(private http: HttpClient, private ticketService: TicketsService) { }

  ngOnInit(): void {
    this.ticketService.getTickets('Refusé').subscribe(tickets => this.tickets = tickets);
  }

  handlePageChange(event) {
    this.page = event;
  }

}
