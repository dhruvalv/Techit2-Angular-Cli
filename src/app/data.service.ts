import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Ticket} from '../models/ticket';
import { Login } from '../models/login';

export interface DataService {
  listTickets(token: String): Observable<Ticket[]>;
  createTicket(token: String, ticket: Ticket): Observable<Ticket>;
  login(user: Login): Observable<Login>;
}
