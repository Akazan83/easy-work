import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {TicketsService} from '../../services/tickets/tickets.service';
import {Ticket} from '../../shared/models/ticket.model';
import {Participant} from '../../shared/models/participant.model';
import {Commentarie} from "../../shared/models/commentarie.model";

@Component({
  selector: 'app-detail-ticket',
  templateUrl: './detail-ticket.component.html',
  styleUrls: ['./detail-ticket.component.scss']
})
export class DetailTicketComponent implements OnInit {
  ticketId: number;
  ticket: Ticket;
  participants: Participant[];
  commentaries: Commentarie[];

  constructor(private route: ActivatedRoute,private http: HttpClient, private ticketService: TicketsService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ticketService.getTicket(id)
      .subscribe(ticket => {
        this.ticket = ticket;
        this.participants = ticket.participants;
        this.commentaries = ticket.commentaries;
    });
  }

  addParticipant(newParticipant){
    //this.participants.push(participant);
  }

  removeParticipant(removeParticipant){
    //this.participants.splice(removeParticipant,1);
  }
}
