import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ticket} from '../../models/ticket.model';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Participant} from '../../models/participant.model';
import {Commentarie} from '../../models/commentarie.model';
import {TicketStateEnum} from '../../components/workflow/ticket/ticketStateEnum';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  tickets: Ticket[];
  constructor(private httpClient: HttpClient) { }

  init(){
    return new Promise<void>((resolve, reject) => {
      this.getTickets().subscribe(tickets => {
        this.tickets = tickets;
        resolve();
      });
    });
  }

  public getTicket(id: number): Observable<Ticket> {
    return this.httpClient.get<Ticket>(`/api/tickets/${id}`).pipe(
      map(ticket => new Ticket().deserialize(ticket)),
      catchError(() => throwError('Ticket not found'))
    );
  }

  public postNewTicket(title: string, description: string, endDate: string, participants: Participant[],
                       commentaries: Commentarie[], file: File, owner: number){

    const formData = new FormData();
    formData.append('file', file);
    const ticket = new Ticket();
    ticket.title = title;
    ticket.description = description;
    ticket.status = TicketStateEnum.waiting;
    ticket.participants = participants;
    ticket.commentaries = commentaries;
    ticket.endDate = endDate;
    ticket.owner = owner;
    ticket.file = formData;
    return this.httpClient.post<Ticket>(`/api/tickets/`, ticket).pipe(map(data => data));
  }

  public postCommentarie(ticket: Ticket, ticketId: number){
    return this.httpClient.put<Ticket>(`/api/tickets/` + ticketId, ticket).pipe(map(data => data));
  }

  public updateTicket(ticket: Ticket, ticketId: number){
    return this.httpClient.put<Ticket>(`/api/tickets/` + ticketId, ticket).pipe(map(data => data));
  }

  private getTickets(): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(`/api/tickets`).pipe(
      map(data => data.map(ticket => new Ticket().deserialize(ticket)))
    );
  }
}
