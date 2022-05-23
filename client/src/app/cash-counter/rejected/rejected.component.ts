import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { environment } from "../../../environments/environment";
import { CashcounterService } from "../cashcounter.service";
import { Budget, Receipt, Receipt1 } from "../models/receipt";

@Component({
  selector: "app-rejected",
  templateUrl: "./rejected.component.html",
  styleUrls: ["./rejected.component.scss"],
})
export class RejectedComponent implements OnInit {
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
    private cashcounter: CashcounterService,
    private router1: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getreceipt();
  }
  getreceipt() {
    this.cashcounter.getreceipt(environment.baseUrl + "getreceipt2").subscribe(
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
}
