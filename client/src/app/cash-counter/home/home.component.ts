import { formatDate } from "@angular/common";
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
import { Budget, Rec, Receipt, Receipt1 } from "../models/receipt";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  current = new Date();
  value = formatDate(this.current, "dd-MM-yyyy", "en-US");
  totalLength: any;
  page: number = 1;
  receipt?: Receipt[];
  receipt2?: Receipt1[];
  receipt1?: Budget[];
  rec?: Rec[];
  myInterval: number | false = 6000;
  slides: any[] = [];
  activeSlideIndex: number = 0;
  noWrapSlides: boolean = false;
  userid: any;
  pending:any;
  approved:any;
  rejected:any;
  cancelled:any;
  options = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private cashcounter: CashcounterService,
    private router1: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getcount()
    this.getreceipt();
    this.initForm();
    this.userid = parseInt(localStorage.getItem("Userid"));
  }

  getreceipt() {
    this.cashcounter.getreceipt(environment.baseUrl + "getreceipt").subscribe(
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
  show(val: any) {
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
  initForm() {}
  getcount(){
    
      this.cashcounter.getreceipt(environment.baseUrl + "getcount1").subscribe(
        (result: any) => {
          this.approved = result[0].count;
        });
        this.cashcounter.getreceipt(environment.baseUrl + "getcount2").subscribe(
          (result: any) => {
            this.pending = result[0].count;
          });
          this.cashcounter.getreceipt(environment.baseUrl + "getcount3").subscribe(
            (result: any) => {
              this.rejected = result[0].count;
            });
            this.cashcounter.getreceipt(environment.baseUrl + "getcount4").subscribe(
              (result: any) => {
                this.cancelled = result[0].count;
              });
    }

  }

