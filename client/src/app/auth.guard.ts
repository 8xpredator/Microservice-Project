import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 constructor( private login : LoginService, private router:Router){}


 canActivate():boolean{

  if (this.login.isLoggedIn()){
    return true
  } else {
    this.router.navigate(['/login'])
    return false

  }

  }

 }
  

