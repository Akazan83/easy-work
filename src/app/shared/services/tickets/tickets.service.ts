import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ticket} from '../../models/ticket.model';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

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

  private getTickets(): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(`/api/tickets`).pipe(
      map(data => data.map(ticket => new Ticket().deserialize(ticket)))
    );
  }
}
