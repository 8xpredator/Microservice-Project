import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient ,private router:Router) { }

  postrequest(url:string, payload:string, options :any) { return this.http.post(url,payload,options) }

  getrequest(url:string ){ return this.http.get(url) }

  isLoggedIn(){ return !!localStorage.getItem('token');  }
  
  logoutUser(){ localStorage.removeItem('token'); localStorage.removeItem('Userid'); localStorage.removeItem('Receiptno'); this.router.navigate(['/login']); }

  logoutUser1(){ localStorage.removeItem('token'); localStorage.removeItem('Userid'); localStorage.removeItem('Receiptno');}

  getToken(){ return localStorage.getItem('token'); }
}
