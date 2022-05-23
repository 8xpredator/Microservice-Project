import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ViewChild } from "@angular/core";
import {
  FormArray,
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
import { Budget, Receipt, Receipt1, Receipt2, Select } from "../models/receipt";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-cancel",
  templateUrl: "./cancel.component.html",
  styleUrls: ["./cancel.component.scss"],
})
export class CancelComponent implements OnInit {
  current = new Date();
  value = formatDate(this.current, "dd-MM-yyyy", "en-US");
  amt = 0;
  Amts = 0;
  i: number = 0;
  chequeForm: FormGroup;
  show: boolean = false;
  sh: number = 0;
  receiptForm: FormGroup;
  datePipe: any;
  select2?: Select[];
  options = { headers: { "Content-Type": "application/json",authorization: `Bearer ${localStorage.getItem("token")}`,},};
  //receipt: number;
  show3: boolean = true;
  show1: boolean = false;
  recForm: FormGroup;
  receipt?: Receipt[];
  constructor(
    private fb: FormBuilder,
    private cashcounter: CashcounterService,
    private router1: ActivatedRoute,
    private router: Router
  ) {
    this.recForm = fb.group({
      receiptno: new FormControl(),
    });
    this.receiptForm = fb.group({
      Receiptno: new FormControl(),
      Entrydate: new FormControl(),
      Nature: new FormControl(),
      party: new FormControl(),
      nameRemitter: new FormControl(),
      Address: new FormControl(),
      TypeR: new FormControl(),
      skills: this.fb.array([]),
      Budgets: new FormControl(),
      Amounts: new FormControl(),
      Total: new FormControl(),
      Narration: new FormControl(),
      ReceivedAmt: new FormControl(),
      Balance: new FormControl(),
    });
    this.chequeForm = fb.group({
      DDno: new FormControl(),
      DDdate: new FormControl(),
      nameofbank: new FormControl(),
      branch: new FormControl(),
      branchcode: new FormControl(),
      Remainingdate: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.getreceiptno();
    this.initForm();
    this.setData();
    this.getselect();
  }
  setData() {
    ++this.i;
    this.initForm();
    this.receiptForm.get("Amounts").setValue('');
    this.receiptForm.get("Entrydate").setValue(this.value);
      this.cashcounter.getreceipt(environment.baseUrl + "getrecid").subscribe(
        (result: any) => {
            this.receiptForm.controls["Receiptno"].setValue(result);
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
  select1() {
    this.show = false;
    this.chequeForm.reset();
  }
  select() {
    this.show = true;
  }

  submitForm() {
    const pay1 = {
      receiptno: this.recForm.value.receiptno,
    }

    this.cashcounter
          .updatestatus(
            environment.baseUrl + "updatecancel",
            JSON.stringify(pay1),
            this.options
          )
          .subscribe(
            (result: any) => {
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
    var time = new Date();
    var time1=parseInt(time.toLocaleString('en-US', { hour: 'numeric', hour12: true }));
    let payload1 = {};
    var Entrydate = formatDate(this.current, "yyyy-MM-dd", "en-US");
    const Rec = this.receiptForm.value.Receiptno;
    if (this.receiptForm.value.Nature == 1) {
      payload1 = {
        Receiptno: this.receiptForm.value.Receiptno,
        Entrydate,
        Nature: this.receiptForm.value.Nature,
        party: this.receiptForm.value.party,
        nameRemitter: this.receiptForm.value.nameRemitter,
        Address: this.receiptForm.value.Address,
        TypeR: this.receiptForm.value.TypeR,
        Budget: this.receiptForm.value.Budgets,
        Amount: this.receiptForm.value.Amounts,
        budgets: this.skills.value,
        Total: this.receiptForm.value.Total,
        Narration: this.receiptForm.value.Narration,
        ReceivedAmt: this.receiptForm.value.ReceivedAmt,
        Balance: this.receiptForm.value.Balance,
        time1
      };
    } else {
      payload1 = {
        Receiptno: this.receiptForm.value.Receiptno,
        Entrydate,
        Nature: this.receiptForm.value.Nature,
        party: this.receiptForm.value.party,
        nameRemitter: this.receiptForm.value.nameRemitter,
        Address: this.receiptForm.value.Address,
        TypeR: this.receiptForm.value.TypeR,
        Budget: this.receiptForm.value.Budgets,
        Amount: this.receiptForm.value.Amounts,
        budgets: this.skills.value,
        Total: this.receiptForm.value.Total,
        Narration: this.receiptForm.value.Narration,
        ReceivedAmt: this.receiptForm.value.ReceivedAmt,
        Balance: this.receiptForm.value.Balance,
        DDno: this.chequeForm.value.DDno,
        DDdate: this.chequeForm.value.DDdate,
        nameofbank: this.chequeForm.value.nameofbank,
        branch: this.chequeForm.value.branch,
        branchcode: this.chequeForm.value.branchcode,
        Remainingdate: this.chequeForm.value.Remainingdate,
        time1
      };
    }
   
      this.cashcounter
        .receipt(
          environment.baseUrl + "receipt",
          JSON.stringify(payload1),
          this.options
        )
        .subscribe(
          (result: any) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your form has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
            this.router.navigate(["cashcounter/print/", Rec]);
            this.receiptForm.reset();
            this.chequeForm.reset();
            this.setData();
          },
          (error: any) => {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              position: "center",
            });
            this.receiptForm.reset();
            this.chequeForm.reset();
            this.setData();
          }
        );
    
  }
 
  getreceiptno() {
    this.cashcounter.getreceipt(environment.baseUrl + "getreceiptno1").subscribe(
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
  resetForm1() {
    this.recForm.reset();
    this.show1=false;
    this.receiptForm.reset();
    this.chequeForm.reset();
  }
  display1() {
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
        this.show1=true;
       
      }
    });
   let v=this.recForm.value.receiptno;
    
    localStorage.setItem("Receiptno", v);


  }
  resetForm() {
    this.receiptForm.reset();
    this.chequeForm.reset();
    this.setData();
  }
  get skills(): FormArray {
    return this.receiptForm.get("skills") as FormArray;
  }
  addSkills() {
    const newskill = this.fb.group({
      Budget: new FormControl("", [Validators.required]),
      Amount: new FormControl("", [Validators.required]),
    });
    this.skills.push(newskill);
  }
  removeSkill(i: number) {
    this.rem(i);
    this.skills.removeAt(i);
  }
  rem(i: any) {
    this.amt = parseInt(this.skills.at(i).value.Amount);
    const a = this.receiptForm.value.Total;
    this.Amts = parseInt(a) - this.amt;
    let b = this.Amts;
    this.receiptForm.controls["Total"].setValue(b);
  }
  Tot() {
    this.amt = 0;
    for (let i = 0; i < this.skills.length; i++) {
      this.amt = this.amt + parseInt(this.skills.at(i).value.Amount);
    }
    const a = this.receiptForm.value.Amounts;
    this.Amts = this.amt + parseInt(a);
    let b = this.Amts;
    if (b < 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Total cannot be negative",
      });
      this.receiptForm.controls["Total"].setValue('');
      this.receiptForm.controls["Amounts"].setValue('');
      this.skills.reset();
     
     
    }else{
      this.receiptForm.controls["Total"].setValue(b);
    }
     this.receiptForm.controls["ReceivedAmt"].setValue('');
      this.receiptForm.controls["Balance"].setValue('');
  }
  
  Rec() {
    const b = this.receiptForm.value.ReceivedAmt;
    const c = this.receiptForm.value.Total;
    let z = b - c;
    this.receiptForm.controls["Balance"].setValue(z);
    if (z < 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Received Amount should be greater than Total amount",
      });
      this.receiptForm.controls["ReceivedAmt"].setValue('');
      this.receiptForm.controls["Balance"].setValue('');
      
    }
  }
  cal() {
    let currentDate = new Date();
    let dateSent = new Date(this.chequeForm.value.DDdate);
    let differenceInTime = dateSent.getTime() - currentDate.getTime();
    let differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
    let s = differenceInDays + 1;
    this.chequeForm.get("Remainingdate").setValue(s);
    if (s <= 1) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Remaining date must be greater than 2!",
      });
      this.chequeForm.reset();
    }
  }

  initForm() {
    this.recForm = this.fb.group({
      receiptno: new FormControl(null, [Validators.required]),
    });
    this.receiptForm = this.fb.group({
      Receiptno: new FormControl("", [Validators.required]),
      Entrydate: new FormControl("", [Validators.required]),
      Nature: new FormControl("1", [Validators.required]),
      party: new FormControl("", [Validators.required]),
      nameRemitter: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern("^[a-zA-Z` -']+"),
      ]),
      Address: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(250),
      ]),
      TypeR: new FormControl("", [Validators.required]),
      skills: this.fb.array([]),
      Budgets: new FormControl("", [Validators.required]),

      Amounts: new FormControl("", [Validators.required]),
      Total: new FormControl("", [Validators.required]),
      Narration: new FormControl("", [Validators.required]),
      ReceivedAmt: new FormControl("", [Validators.required]),
      Balance: new FormControl("", [Validators.required]),
    });
    this.chequeForm = this.fb.group({
      DDno: new FormControl("", [Validators.required, Validators.minLength(4)]),
      DDdate: new FormControl("", [Validators.required]),
      nameofbank: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern("^[a-zA-Z` -']+"),
      ]),
      branch: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern("^[a-zA-Z` -']+"),
      ]),
      branchcode: new FormControl("", [Validators.required]),
      Remainingdate: new FormControl("", [Validators.required]),
    });
  }
  getselect() {
    this.cashcounter.getreceipt(environment.baseUrl + "selectLedger").subscribe(
      (result: any) => {
        this.select2 = result;
      },
      (error: any) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong.!",
        });
      }
    );
  }
}

