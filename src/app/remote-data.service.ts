import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Ticket } from '../models/ticket';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Login } from '../models/login';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class RemoteDataService  implements DataService {
  constructor(private http: HttpClient) {}
  listTickets(token: String): Observable<Ticket[]> {
    return this.http.get<Ticket[]>('/api/tickets', {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+ token)
  });
  }

  createTicket(token: String, ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>('/api/tickets', ticket, {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+ token)
  });
  }

  login(user: Login): Observable<Login> {
    return this.http.post<Login>('/api/login', user);
  }

}
