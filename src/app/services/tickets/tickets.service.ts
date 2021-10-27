import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ticket} from '../../shared/models/ticket.model';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private httpClient: HttpClient) { }

  public getTickets(status): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(`/api/tickets?status=`+ status).pipe(
      map(data => data.map(ticket => new Ticket().deserialize(ticket)))
    );
  }

  public getTicket(id: number): Observable<Ticket> {
    return this.httpClient.get<Ticket>(`/api/tickets/${id}`).pipe(
      map(ticket => new Ticket().deserialize(ticket)),
      catchError(() => throwError('Ticket not found'))
    );
  }
}
