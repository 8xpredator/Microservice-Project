import { formatDate } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
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
//import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: "app-verification",
  templateUrl: "./verification.component.html",
  styleUrls: ["./verification.component.scss"],
})
export class VerificationComponent implements OnInit {
  current = new Date();
  value = formatDate(this.current, "dd-MM-yyyy", "en-US");
  totalLength: any;
  page: number = 1;
  receipt?: Receipt[];
  receipt2?: Receipt1[];
  receipt1?: Budget[];
  rec?:Rec[];
  remarkForm: FormGroup;
  // options = { headers: { "Content-Type": "application/json" } };
  options = { headers: { "Content-Type": "application/json", "authorization": `Bearer ${localStorage.getItem("token")}` } };
 
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private cashcounter: CashcounterService,
    private router1: ActivatedRoute,
    private router: Router
  ) {
    this.remarkForm = fb.group({
      remark: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.getreceipt();
    this.initForm();
    console.log(this.options);
  }
  display() {}
  submitForm(val: any) {

    const payload = {
      remark: this.remarkForm.value.remark,
      val,
    };
    this.cashcounter
      .updatestatus(
        environment.baseUrl + "updateremark",
        JSON.stringify(payload),
        this.options
      )
      .subscribe(
        (result: any) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Updated Sucessfully",
            showConfirmButton: true,
          });
          this.getreceipt();
          this.remarkForm.reset();
        },
        (error: any) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            position: "center",
          });
          this.getreceipt();
        }
      );
  }
  onChange(val: any, receiptno: any) {
    this.rec=receiptno;
    const payload1 = {
      val,
      receiptno,
    };

    this.cashcounter
      .updatestatus(
        environment.baseUrl + "updatestatus",
        JSON.stringify(payload1),
        this.options
      )
      .subscribe(
        (result: any) => {},
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
  initForm() {
    this.remarkForm = this.fb.group({
      remark: new FormControl("", [Validators.required]),
    });
  }
}
