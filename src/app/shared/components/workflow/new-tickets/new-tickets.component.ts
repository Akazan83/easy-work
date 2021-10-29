import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-tickets',
  templateUrl: './new-tickets.component.html',
  styleUrls: ['./new-tickets.component.scss']
})
export class NewTicketsComponent implements OnInit {
  participants = [];
  participant = '';
  constructor() { }

  ngOnInit(): void {
  }

  addParticipant(newParticipant){
  }

  removeParticipant(removeParticipant){
    this.participants.splice(removeParticipant,1);
  }

}
