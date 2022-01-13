import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ticket} from '../../models/ticket.model';
import {Observable, throwError} from 'rxjs';
import {catchError, filter, map} from 'rxjs/operators';
import {Participant} from '../../models/participant.model';
import {Commentary} from '../../models/commentary.model';
import {TicketStateEnum} from '../../components/workflow/ticket/ticketStateEnum';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  tickets: Ticket[];
  constructor(private httpClient: HttpClient) { }

  init(){
    return new Promise<void>((resolve) => {
      this.getTickets().subscribe(tickets => {
        this.tickets = tickets;
        resolve();
      });
    });
  }

  public getTicket(id: string): Observable<Ticket> {
    return this.httpClient.get<Ticket>(`http://localhost:8080/api/v1/tickets/${id}`).pipe(
      map(ticket => new Ticket().deserialize(ticket)),
      catchError(() => throwError('Ticket not found'))
    );
  }

  public postNewTicket(title: string, description: string, endDate: string, participants: Participant[],
                       commentaries: Commentary[], file: File, owner: string){

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
    return this.httpClient.post<Ticket>(`http://localhost:8080/api/v1/ticket`, ticket).pipe(map(data => data));
  }

  public updateTicket(ticket: Ticket, ticketId: string){
    return this.httpClient.put<Ticket>(`http://localhost:8080/api/v1/tickets/` + ticketId, ticket).pipe(map(data => data));
  }

  public getTickets(): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(`http://localhost:8080/api/v1/tickets`).pipe(
      map(data => data.map(ticket => new Ticket().deserialize(ticket)))
    );
  }

  public getTicketsByStatus(status,page): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(`http://localhost:8080/api/v1/tickets/filtered/${status}/${page}`).pipe(
      map(tickets => {
        if(tickets != null){
          return tickets.map(ticket => new Ticket().deserialize(ticket));
        }
       return null;
      })
    );
  }
}
