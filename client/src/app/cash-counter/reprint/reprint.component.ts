import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalDirective } from "ngx-bootstrap/modal";
import Swal from "sweetalert2";
import { environment } from "../../../environments/environment";
import { CashcounterService } from "../cashcounter.service";
import { Budget, Receipt, Receipt1, Receipt2 } from "../models/receipt";
@Component({
  selector: "app-reprint",
  templateUrl: "./reprint.component.html",
  styleUrls: ["./reprint.component.scss"],
})
export class ReprintComponent implements OnInit {
  @ViewChild("largeModal") public largeModal: ModalDirective;
  totalLength: any;
  page: number = 1;
  show: boolean = false;
  show1: boolean = false;
  show2: boolean = true;
  show3: boolean = true;
  show4: boolean = false;
  show5: boolean = true;
  sz:boolean=false;
  s1: boolean = true;
  recForm: FormGroup;
  dateForm: FormGroup;
  receipt?: Receipt[];
  receipt2?: Receipt1[];
  receipt3?: Receipt2[];
  receipt1?: Budget[];
  // options = { headers: { "Content-Type": "application/json" } };
  options = { headers: { "Content-Type": "application/json", "authorization": `Bearer ${localStorage.getItem("token")}` } };
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private cashcounter: CashcounterService,
    private router1: ActivatedRoute,
    private router: Router
  ) {
    this.recForm = fb.group({
      receiptno: new FormControl(),
    });

    this.dateForm = fb.group({
      fromdate: new FormControl(),
      todate: new FormControl(),
    });
  }
  ngOnInit(): void {
    this.getreceiptno();
    this.initForm();
  }
  display1() {
    this.show1 = true;
    this.show = true;
    this.show2 = false;
    this.show5 = false;
    this.showno(this.recForm.value.receiptno);
  }
  display2() {
    let z= this.dateForm.value.fromdate;
    let x= this.dateForm.value.todate;
    let newDate1 = new Date(z);  
    let newDate2 = new Date(x);  
    if(newDate1.getTime() <= newDate2.getTime())
    {
    this.show1 = false;
    this.show5 = false;
    this.show = false;
    this.show3 = false;
    this.show4 = true;
    this.showtable(this.dateForm.value.fromdate, this.dateForm.value.todate);
    }
    else{
      this.sz=true;
    }
  }
  resetForm1() {
    this.show1 = false;
    this.show2 = true;
    this.recForm.reset();
  }
  resetForm2() {
    this.show4 = false;
    this.dateForm.reset();
    this.show3 = true;
    this.sz=false;
  }
  initForm() {
    this.recForm = this.fb.group({
      receiptno: new FormControl(null, [Validators.required]),
    });
    this.dateForm = this.fb.group({
      fromdate: new FormControl("", [Validators.required]),
      todate: new FormControl("", [Validators.required]),
    });
  }
  getreceiptno() {
    this.cashcounter.getreceipt(environment.baseUrl + "getreceiptno").subscribe(
      (result: any) => {
        this.receipt = result;
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
  showno(val: any) {
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
  showtable(val1:any, val2:any) {
    const payload = {
      val1,
      val2,
    };
    this.cashcounter
      .updatestatus(
        environment.baseUrl + "displaytable",
        JSON.stringify(payload),
        this.options
      )
      .subscribe(
        (result: any) => {
          this.receipt3 = result;
          this.totalLength = result.length;
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
  captcha_date() {
    var z = this.dateForm.value.fromdate;
    var x = this.dateForm.value.todate;
    if(this.Comparedate(z,x))
    {
      this.sz=false;
    }else{
      this.sz=true;
    }
  }
  Comparedate(a:string,b:string) {   
    if (a > b) 
    {
      return false;
    } 
    else {
      return true;
    }
  }
}
