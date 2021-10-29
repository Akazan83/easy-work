import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {TicketsService} from '../../../../services/tickets/tickets.service';
import {Ticket} from '../../../models/ticket.model';
import {Participant} from '../../../models/participant.model';
import {Commentarie} from "../../../models/commentarie.model";
import {User} from "../../../models/user.model";

@Component({
  selector: 'app-detail-ticket',
  templateUrl: './detail-ticket.component.html',
  styleUrls: ['./detail-ticket.component.scss']
})
export class DetailTicketComponent implements OnInit {
  ticket: Ticket;
  participants: Participant[];
  commentaries: Commentarie[];
  user: User;
  isOwner: boolean;

  constructor(private route: ActivatedRoute,private http: HttpClient, private ticketService: TicketsService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ticketService.getTicket(id)
      .subscribe(ticket => {
        this.ticket = ticket;
        this.participants = ticket.participants;
        this.commentaries = ticket.commentaries;
        this.isOwner = this.user.id === this.ticket.owner;
    });
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  addParticipant(newParticipant){
    //this.participants.push(participant);
    console.log(this.ticket);
  }

  removeParticipant(removeParticipant){
    //this.participants.splice(removeParticipant,1);
  }
}
