import { formatDate } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import Swal from "sweetalert2";
import { environment } from "../../../environments/environment";
import { CashcounterService } from "../cashcounter.service";
import { Receipt } from "../models/receipt";
@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.scss"],
})
export class ReportsComponent implements OnInit {
  current = new Date();
  value = formatDate(this.current, "dd-MM-yyyy", "en-US");
  sum = 0;
  totalLength = 0;
  show1: boolean = false;
  s1: boolean = false;
  show: boolean = false;
  dateForm: FormGroup;
  receipt?: Receipt[];
 options = { headers: { "Content-Type": "application/json", "authorization": `Bearer ${localStorage.getItem("token")}` } };
  constructor(
    private fb: FormBuilder,
    private cashcounter: CashcounterService,
  ) {
    this.dateForm = fb.group({
      fromdate: new FormControl(),
      todate: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  display2() {
    let z= this.dateForm.value.fromdate;
    let x= this.dateForm.value.todate;
    let newDate1 = new Date(z);  
    let newDate2 = new Date(x);  
    if(newDate1.getTime() <= newDate2.getTime())
    {
      this.s1=false;
      this.show1 = true;
    this.showtable(this.dateForm.value.fromdate, this.dateForm.value.todate);
    }else{
      this.s1=true;
      this.show1 = false;
    }
    
  }

  resetForm2() {
    this.dateForm.reset();
    this.show1 = false;
    this.s1=false;
  }
  get f() {
    return this.dateForm.controls;
  }
  get endDate() {
    return this.dateForm.get("fromdate");
  }
  get startDate() {
    return this.dateForm.get("todate");
  }

  showtable(val1:any, val2:any) {
    const payload = {
      val1,
      val2,
    };
    this.cashcounter
      .updatestatus(
        environment.baseUrl + "displaytable1",
        JSON.stringify(payload),
        this.options
      )
      .subscribe(
        (result: any) => {
          this.receipt = result;
          this.totalLength = result.length;
          for (let i = 0; i < result.length; i++) {
            this.sum = this.sum + parseInt(result[i].total);
          }
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
  initForm() {    
    this.dateForm = this.fb.group({
      fromdate: new FormControl("", [Validators.required]),
      todate: new FormControl("", [Validators.required]),
    });
  }
}
