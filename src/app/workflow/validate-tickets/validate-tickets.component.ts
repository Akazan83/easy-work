import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TicketsService} from "../../services/tickets/tickets.service";

@Component({
  selector: 'app-validate-tickets',
  templateUrl: './validate-tickets.component.html',
  styleUrls: ['./validate-tickets.component.scss']
})
export class ValidateTicketsComponent implements OnInit {

  tickets = [];
  page = 1;
  constructor(private http: HttpClient, private ticketService: TicketsService) { }

  ngOnInit(): void {
    this.ticketService.getTickets('Validé').subscribe(tickets => this.tickets = tickets);
  }

  handlePageChange(event) {
    this.page = event;
  }
}
