import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Ticket } from '../../models/ticket';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token = '';
  create = false;
  view = false;
  datamissing = false;
  unitNotFound = false;
  noTickets = false;
  tickets: Ticket[] = [];
  ticket: Ticket = {};
  units = [];
  constructor( private router: Router,
    @Inject('DataService') private dataService: DataService) { }

  ngOnInit() {
    this.units = [{'id': 1, 'name': 'TechOps'}, {'id': 2, 'name': 'ITC'}];
  }


  onKey(event: any) { // without type info
    this.datamissing = false;
    this.unitNotFound = false;
  }

  viewTickets(): boolean {
    this.noTickets = false;
    this.view = true;
    this.create = false;
    this.token = localStorage.getItem('jwt_token');
    this.dataService.listTickets(this.token).subscribe(result => {
      console.log(result);
      if (result.length > 0){
        this.tickets = result;
      }else{
        this.noTickets = true;
      }
     });
    return false;
  }

  createClicked(): boolean{
    this.noTickets = false;
    this.create = true;
    this.view = false;
    return false;
  }

  createTicket(): boolean {
    this.view = false;
    this.noTickets = false;
    this.token = localStorage.getItem('jwt_token');
    this.dataService.createTicket(this.token, this.ticket).subscribe(res => {
      const result: any = res;
       if (result.errorcode === 400) {
         this.datamissing = true;
       } else if (result.errorcode === 404) {
         this.unitNotFound = true;
       } else {
         this.create = false;
         this.view = false;
         this.router.navigateByUrl('/home');
       }
     });
    return false;
  }

  logout(): boolean {
    this.noTickets = false;
    this.datamissing = false;
    this.unitNotFound = false;
    localStorage.removeItem('jwt_token');
    this.router.navigateByUrl('/login');
    return false;
  }

}
