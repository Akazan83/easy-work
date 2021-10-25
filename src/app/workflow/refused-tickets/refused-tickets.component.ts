import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-refused-tickets',
  templateUrl: './refused-tickets.component.html',
  styleUrls: ['./refused-tickets.component.scss']
})
export class RefusedTicketsComponent implements OnInit {
  tickets = [];
  page = 1;
  constructor() { }

  ngOnInit(): void {
    for (let x = 0; x < 10; x++){
      const ticket = {
        title: 'test ' + x,
        status: 'Refusé',
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
