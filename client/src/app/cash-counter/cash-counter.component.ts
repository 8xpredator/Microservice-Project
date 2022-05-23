import { Component, OnInit } from '@angular/core';
import { navItems1, navItems2 } from '../_nav';
import { HttpClient } from '@angular/common/http';
import { CashcounterService } from './cashcounter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cash-counter',
  templateUrl: './cash-counter.component.html',
  styleUrls: ['./cash-counter.component.scss']
})
export class CashCounterComponent implements OnInit {
  public sidebarMinimized = false;
  todoitems:number;
  public navItems;
  Usertype:number;

  toggleMinimize(e:any) {
    this.sidebarMinimized = e;
  }
  options = { headers: { "Content-Type": "application/json" } };
  constructor(
    private http: HttpClient,
    public cashcounter: CashcounterService,
    private router1: ActivatedRoute,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    // document.addEventListener("contextmenu", function (e) {
    //   e.preventDefault();
    // });
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Welcome',
      showConfirmButton: false,
      timer: 1500
    })
   
    this.todoitems = parseInt(localStorage.getItem("Userid"));
    if(this.todoitems){
    this.Init(this.todoitems);
    }
    
    // window.addEventListener("beforeunload", () => localStorage.removeItem('token'));
    // window.addEventListener("beforeunload", () => localStorage.removeItem('Userid'));
    // var duration=1000;
   
    // setInterval(updateTimer,1000);
    // function updateTimer(){
    //   duration--;
    //   if(duration<1){
    //     localStorage.removeItem('token');
    //     location.reload();
    //   }
    // }
    // window.addEventListener("mousemove",resetTimer);
    // function resetTimer(){
    //   duration=1000;
    // }     
 }


Init(val:any){
  const payload={ val }

  

  this.cashcounter
    .updatestatus(
      environment.baseUrl + "Usertype",
      JSON.stringify(payload),
      this.options
    )
    .subscribe(
      (result) => {
        this.Usertype = parseInt(result[0].type);
        if(this.Usertype===2){
         this.navItems = navItems1;
        }
        else if(this.Usertype===3){
        
          this.navItems = navItems2;
        }
        else{
          this.router.navigate(['/login']);

        }
      },
      (error: any) => {
        if(error.status==500){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          position: "center",
        });
      }
    });  
  }
}

