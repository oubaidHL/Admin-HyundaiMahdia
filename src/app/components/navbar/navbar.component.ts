import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuth = false;

  constructor( private UsersService:UsersService,
    private router: Router) { 
    
  }

  ngOnInit(): void {
    
    this.isAuth = this.UsersService.isAuth;
  }

  logout(){

    this.UsersService.logout();
    this.isAuth = this.UsersService.isAuth;
    this.router.navigate(['login']);

  }

}
