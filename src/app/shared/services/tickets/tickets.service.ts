import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Ticket} from '../../models/ticket.model';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Participant} from '../../models/participant.model';
import {Commentary} from '../../models/commentary.model';
import {TicketStateEnum} from '../../components/workflow/ticket/ticketStateEnum';
import {APP_CONFIG} from '../../../../environments/environment.web';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  public tickets: Ticket[];
  private baseUrl = APP_CONFIG.apiUrl + '/api/ticket';
  constructor(private httpClient: HttpClient) { }

  init(){
    return new Promise<void>((resolve) => {
      this.getTickets().subscribe(tickets => {
        this.tickets = tickets;
        resolve();
      });
    });
  }


  public getTicketsByStatus(status,page): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(`${this.baseUrl}/tickets/filtered/${status}/${page}`).pipe(
      map(tickets => {
        if(tickets != null){
          return tickets.map(ticket => new Ticket().deserialize(ticket));
        }
        return null;
      })
    );
  }

  public getTicket(id: string): Observable<Ticket> {
    return this.httpClient.get<Ticket>(`${this.baseUrl}/getOne/${id}`).pipe(
      map(ticket => new Ticket().deserialize(ticket)),
      catchError(() => throwError('Ticket not found'))
    );
  }

  public postNewTicket(title: string, description: string, endDate: string, participants: Participant[],
                       commentaries: Commentary[], file: File, owner: string, ownerName: string){

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
    ticket.ownerName = ownerName;
    ticket.file = formData;
    return this.httpClient.post<Ticket>(`${this.baseUrl}/new`, ticket).pipe(map(data => data));
  }

  public updateTicket(ticket: Ticket, ticketId: string, updateType: string){
    const headers = new HttpHeaders({type: updateType});
    const options = { headers };
    console.log('addNewParticipant REQUEST');
    return this.httpClient.put<Ticket>(`${this.baseUrl}/update/` + ticketId, ticket, options)
      .pipe(map(data => data));
  }

  public getTickets(): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(`${this.baseUrl}/getAll`).pipe(
      map(data => data.map(ticket => new Ticket().deserialize(ticket)))
    );
  }

  public deleteTicket(ticketId: string){
    return this.httpClient.delete<Ticket[]>(`${this.baseUrl}/delete/${ticketId}`);
  }
}
