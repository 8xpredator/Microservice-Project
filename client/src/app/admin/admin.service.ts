import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient ,private router:Router) { }

  postrequest(url:string, payload:string, options :any) { return this.http.post(url,payload,options) }

  getrequest(url:string){ return this.http.get(url) }

  logoutUser(){ localStorage.removeItem('token'); localStorage.removeItem('Userid'); this.router.navigate(['/login']); }


}
