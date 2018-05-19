import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import {Login} from '../../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalid = false;
  loggedInUser: String;
  user = new Login();
  constructor(
    private router: Router,
    @Inject('DataService') private dataService: DataService
  ) {}

  ngOnInit() {  }

  onKey(event: any) { 
    this.invalid = false;
  }

  login(): boolean {
    this.dataService.login(this.user).subscribe(res => {
      const result: any = res;
      console.log(result);
     // this.response = result;
       if (result.message === 'Invalid Username/Password' || result.message === 'User not found') {
           this.invalid = true;
       } else {
         localStorage.setItem('jwt_token', result.token);
         this.router.navigateByUrl('/home');
       }
    });
    return false;
  }
}
