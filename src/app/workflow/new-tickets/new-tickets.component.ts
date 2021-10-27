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
    for (let x = 0; x < 3; x++){
      const participant = {
        id: x,
        nom: 'John ' + x,
        prenom: 'Doe',
        role: 'Manager',
        status: 'En attente'
      };
      this.participants.push(participant);
    }
  }

  addParticipant(newParticipant){
    const participant = {
      nom: newParticipant,
      prenom: 'Doe',
      role: 'Manager',
      status: 'En attente'
    };
    this.participants.push(participant);
  }

  removeParticipant(removeParticipant){
    this.participants.splice(removeParticipant,1);
  }

}
