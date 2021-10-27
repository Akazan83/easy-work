import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-detail-ticket',
  templateUrl: './detail-ticket.component.html',
  styleUrls: ['./detail-ticket.component.scss']
})
export class DetailTicketComponent implements OnInit {
  participants = [];
  demande = {};
  participant = '';
  numeroDemande: number;
  isOwner: boolean;

  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.isOwner = false;
    if (id === 2){
      this.isOwner = true;
    }
    this.numeroDemande = id;
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
    this.getDemande(id);
  }

  getDemande(id){
    this.demande = {
      id: 1,
      title: 'test ' + id,
      status:'En attente',
      description: 'Contrary to popular belief, Lorem Ipsum is not simply random text.' +
        ' It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ' +
        'Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, ' +
        'looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,' +
        ' and going through the cites of the word in classical literature, discovered the undoubtable source.' +
        ' Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"' +
        ' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics,' +
        ' very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",' +
        ' comes from a line in section 1.10.32.',
      reference: 54651641,
      creationDate: new Date(),
      endDate: new Date(),
    };
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
