import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-validate-tickets',
  templateUrl: './validate-tickets.component.html',
  styleUrls: ['./validate-tickets.component.scss']
})
export class ValidateTicketsComponent implements OnInit {

  tickets = [];
  page = 1;
  constructor() { }

  ngOnInit(): void {
    for (let x = 0; x < 10; x++){
      const ticket = {
        id: x,
        title: 'test ' + x,
        status: 'Validé',
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
