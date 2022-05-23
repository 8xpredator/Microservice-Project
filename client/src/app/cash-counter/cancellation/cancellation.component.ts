import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormArray,
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
  selector: "app-cancellation",
  templateUrl: "./cancellation.component.html",
  styleUrls: ["./cancellation.component.scss"],
})
export class CancellationComponent implements OnInit {
  amt = 0;
  Amts = 0;
  time1:any;
  timesh: boolean = true;
  chequeForm: FormGroup;
  receiptForm: FormGroup;
  show: boolean = false;
  totalLength: any;
  page: number = 1;
  receipt?: Receipt[];
  receipt2?: Receipt1[];
  receipt1?: Budget[];
  // options = { headers: { "Content-Type": "application/json" } };
  options = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router1: ActivatedRoute,
    private router: Router,
    private cashcounter: CashcounterService
  ) {}

  ngOnInit(): void {
    var time = new Date();
         this.time1 = parseInt(time.toLocaleString("en-US", { hour: "numeric", hour12: true }
        ));
    this.getreceipt();
    
  }

  display(val: any) {
    const payload1 = {
      val,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        this.cashcounter
          .updatestatus(
            environment.baseUrl + "updatereceipt",
            JSON.stringify(payload1),
            this.options
          )
          .subscribe(
            (result: any) => {
              this.getreceipt();
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
    });
  }
  show22(val: any) {
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

  getreceipt() {
    this.cashcounter.getreceipt(environment.baseUrl + "getrec").subscribe(
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
  showrec(val: any) {
    this.router.navigate(["cashcounter/receipts/", val]);
  }
}
