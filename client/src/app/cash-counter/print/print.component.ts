import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import jsPDF from "jspdf";
import Swal from "sweetalert2";
import { environment } from "../../../environments/environment";
import { CashcounterService } from "../cashcounter.service";
import { Budget, Receipt1 } from "../models/receipt";
import html2canvas from 'html2canvas';
@Component({
  selector: "app-print",
  templateUrl: "./print.component.html",
  styleUrls: ["./print.component.scss"],
})
export class PrintComponent implements OnInit {
  
  //@ViewChild('printable') printable:ElementRef;
  @ViewChild('printable') printable:ElementRef;
  public receiptno: any;
  show: boolean = true;
  sh: boolean = false;
  receipt2?: Receipt1[];
  receipt1?: Budget[];
  rno:any;
 options = { headers: { "Content-Type": "application/json", "authorization": `Bearer ${localStorage.getItem("token")}` } };
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router1: ActivatedRoute,
    private router: Router,
    private cashcounter: CashcounterService
  ) {}

  ngOnInit(): void {
    let id = parseInt(this.router1.snapshot.paramMap.get("id"));
    this.receiptno = id;
    this.show1(this.receiptno);
    this.rno = parseInt(localStorage.getItem("Receiptno"));
    console.log(this.rno)
    if(isNaN(this.rno)){ this.rno=0;}
    console.log(this.rno)
  }
  show1(val: any) {
    const payload1 = {
      val,
    };
    this.cashcounter
      .updatestatus(
        environment.baseUrl + "displayreceipt",
        JSON.stringify(payload1),
        this.options
      )
      .subscribe(
        (result: any) => {
          this.receipt1 = result;
        },
        (error: any) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            position: "center",
          });
        }
      );
    this.cashcounter
      .updatestatus(
        environment.baseUrl + "displayreceipt1",
        JSON.stringify(payload1),
        this.options
      )
      .subscribe(
        (result: any) => {
          this.receipt2 = result;
        },
        (error: any) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            position: "center",
          });
        }
      );
  }
  printDiv(divName:any){
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    this.ngOnInit();
  } 
  change(){
    this.sh=true;
  }
  // public openPDF():void {
  //   let DATA = document.getElementById('printable');
      
  //   html2canvas(DATA).then(canvas => {
        
  //       let fileWidth = 208;
  //       let fileHeight = canvas.height * fileWidth / canvas.width;
        
  //       const FILEURI = canvas.toDataURL('image/png')
  //       let PDF = new jsPDF('p', 'mm', 'a4');
  //       let position = 0;
  //       PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
  //       PDF.save('angular-demo.pdf');
  //   });     
  // }


  // public downloadPDF():void {
  //   let DATA = this.printable.nativeElement;
  //   let doc = new jsPDF('p','pt', 'a4');

  //   let handleElement = {
  //     '#editor':function(element,renderer){
  //       return true;
  //     }
  //   };
  //   doc.html(DATA.innerHTML);

  //   doc.save('angular-demo.pdf');
  // }
}
