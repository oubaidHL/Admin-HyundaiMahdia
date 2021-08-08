import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isAuth = false;

  constructor(private router: Router,private UsersService:UsersService,) { }

  ngOnInit(): void {
  }

  logout(){

    this.UsersService.logout();
    this.isAuth = this.UsersService.isAuth;
    this.router.navigate(['login']);
  }

}
