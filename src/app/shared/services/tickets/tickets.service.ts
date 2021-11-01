import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ticket} from '../../models/ticket.model';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Participant} from '../../models/participant.model';
import {Commentarie} from '../../models/commentarie.model';

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
    const ticket = new Ticket();
    ticket.title = title;
    ticket.description = description;
    ticket.status = 'En attente';
    ticket.participants = participants;
    ticket.commentaries = commentaries;
    ticket.endDate = endDate;
    ticket.owner = owner;
    ticket.reference = Math.random().toString();

    return this.httpClient.post<Ticket>(`/api/tickets/`, ticket).pipe(map(data => data));;
  }

  private getTickets(): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(`/api/tickets`).pipe(
      map(data => data.map(ticket => new Ticket().deserialize(ticket)))
    );
  }
}
