import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  myInterval: number | false = 6000;
  slides: any[] = [];
  activeSlideIndex: number = 0;
  noWrapSlides: boolean = false;
  constructor(
    private http: HttpClient,
    private admin:AdminService,
    private router1: ActivatedRoute,
    private router: Router
   
  ) { }

  ngOnInit(): void {
    //this.getreceipt()
  }

  getreceipt() {
    this.admin.getrequest(environment.baseUrl + "getcount").subscribe(
      (result: any) => {
        
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          position: "center",
        });
      }
    );
  }

}

