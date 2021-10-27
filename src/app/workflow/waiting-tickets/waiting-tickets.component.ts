import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-waiting-tickets',
  templateUrl: './waiting-tickets.component.html',
  styleUrls: ['./waiting-tickets.component.scss']
})
export class WaitingTicketsComponent implements OnInit {
  tickets = [];
  page = 1;
  constructor() { }

  ngOnInit(): void {
    for (let x = 0; x < 10; x++){
      const ticket = {
        id: x,
        title: 'test ' + x,
        status: 'En attente',
        reference: '27243872',
        creationDate: '12 fevrier 2021',
        endDate: '13 fevrier 2021'
      };
      this.tickets.push(ticket);
    }
  }

  handlePageChange(event) {
    this.page = event;
  }

}
