import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CashcounterService {

  constructor(private http: HttpClient ,private router:Router) { }
  postrequest(url:string, payload:string, options :any) { return this.http.post(url,payload,options) }
  getrequest(url:string){ return this.http.get(url) }
  receipt(url:string, payload:string, options :any) { return this.http.post(url,payload,options) }
  getreceipt(url:string){ return this.http.get(url) }
  updatestatus(url:string, payload:string, options :any) { return this.http.post(url,payload,options) }
  logoutUser(){ localStorage.removeItem('token'); localStorage.removeItem('Userid'); this.router.navigate(['/login']); }
}
