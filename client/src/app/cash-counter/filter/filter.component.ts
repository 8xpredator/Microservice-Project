import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { environment } from "../../../environments/environment";
import { CashcounterService } from "../cashcounter.service";
import { Budget, Receipt, Receipt1 } from "../models/receipt";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
})
export class FilterComponent implements OnInit {
  filterForm: FormGroup;
  searchForm:FormGroup;
  show: boolean = false;
  show12: boolean = true;
  show13: boolean = true;
  show14: boolean = true;
  totalLength: any;
  page: number = 1;
  receipt?: Receipt[];
  receipt2?: Receipt1[];
  receipt1?: Budget[];
  filterTerm: string;
 // options = { headers: { "Content-Type": "application/json" } };
 options = { headers: { "Content-Type": "application/json", "authorization": `Bearer ${localStorage.getItem("token")}` } };
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private cashcounter: CashcounterService,
    private router1: ActivatedRoute,
    private router: Router
  ) {
    this.filterForm = fb.group({
      sel: new FormControl(),
    });
    this.searchForm = fb.group({
      search: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.filterForm.reset();
  }

  resetForm() {
    this.show = false;
    this.show12 = true;
    this.show13 = true;
    this.show14 = true;
    this.filterForm.reset();
  }
  submitForm() {
    
    if (
      this.filterForm.value.sel === "0" &&
      this.filterForm.value.sel === null
    ) {
      this.show = false;
    } else {
      this.show12 = false;
    this.show13 = false;
      this.show = true;
      if (this.filterForm.value.sel === "1") {
        this.cashcounter
          .getreceipt(environment.baseUrl + "getcashreceipt")
          .subscribe(
            (result: any) => {
              this.receipt = result;
              this.totalLength = result.length;
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
      } else {
        this.cashcounter
          .getreceipt(environment.baseUrl + "getchequereceipt")
          .subscribe(
            (result: any) => {
              this.receipt = result;
              this.totalLength = result.length;
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
  }
  seaForm(){
   
  }
  initForm() {
    this.filterForm = this.fb.group({
      sel: new FormControl("", [Validators.required]),
    });
    this.searchForm = this.fb.group({
      search: new FormControl("", [Validators.required]),
      
    });
  }
  search_valid(){
    if((this.searchForm.value.search==0)||(this.searchForm.value.search==null))
    
    {
      this.show=false;
      this.receipt=[];
    }
    else{

    
    this.show13=false;
    this.show14 = false;
    this.show=true;
    this.cashcounter
          .getreceipt(environment.baseUrl + "getallreceipt")
          .subscribe(
            (result: any) => {
              this.receipt = result;
              this.totalLength = result.length;
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
}
