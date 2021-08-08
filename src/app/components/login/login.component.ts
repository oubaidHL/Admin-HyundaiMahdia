import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Admin } from '../../models/admin';
import { Result } from '../../models/result';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoggedin: boolean = null;
  errorMessage;
  isAuth = false;

  constructor(private userService: UsersService,
              private router: Router,
              private fb: FormBuilder,
             ) { 
              this.isAuth = this.userService.isAuth;
             }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.initFormLogin();
    this.isAuth = this.userService.isAuth;
  }





  initFormLogin(): void{
    this.loginForm = this.fb.group({
      email: this.fb.control('',Validators.email),
      password: this.fb.control('',Validators.minLength(6))
    });
  }


  onSubmit(): void{
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    const newUser: Admin = {email: email, password:password};

    this.userService.authentifier(newUser).then(
      (data: Result)=>{
        
          this.router.navigate(['/dashboard']);
      }
    ).catch((error)=>{
      this.errorMessage = error;
      setTimeout(() =>{
        this.errorMessage = null;
      },3000);
      console.log(error);

    });
   // console.log({email: email, password: password});

  }

}
