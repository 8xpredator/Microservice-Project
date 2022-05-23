import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
  FormsModule,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { cibWindows } from "@coreui/icons";
import Swal from "sweetalert2";
import { parseJsonText } from "typescript";
import { environment } from "../../../environments/environment";
import { AdminService } from "../admin.service";
import { Select, Select1 } from "../model/Select";
const g_id = 1;
@Component({
  selector: "app-addledger",
  templateUrl: "./addledger.component.html",
  styleUrls: ["./addledger.component.scss"],
})
export class AddledgerComponent implements OnInit {
  addledgerForm!: FormGroup;
  mes1: boolean = false;
  mes2: boolean = false;
  mes3: boolean = false;
  select?: Select[];
  select1?: Select1[];
  options = { headers: { "Content-Type": "application/json", "authorization": `Bearer ${localStorage.getItem("token")}` } };
  public pid;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private admin: AdminService,
    private router1: ActivatedRoute,
    private router: Router
  ) {
    this.addledgerForm = new FormGroup({
      phead: new FormControl(),
      select1: new FormControl(),
      Grouphead: new FormControl(),
      HeadName: new FormControl(),
      GheadDesc: new FormControl(),
      Type: new FormControl(),
      Section: new FormControl(),
    });
  }

  ngOnInit(): void {
    let id = parseInt(this.router1.snapshot.paramMap.get("id"));
    this.pid = id;
    this.initForm();
    this.getselect();
    this.getselect1(this.pid);
    this.getval(this.pid);
  
  }

  submitForm() {
    if (this.addledgerForm.invalid) {
      if (this.pid > 0 && this.pid < 200000000000000) {
        this.pid = 1;
      } else if (this.pid > 200000000000000 && this.pid < 300000000000000) {
        this.pid = 2;
      } else if (this.pid > 300000000000000 && this.pid < 400000000000000) {
        this.pid = 3;
      } else {
        this.pid = 4;
      }
      const pid = this.pid;
      const ledgerhead = (<HTMLInputElement>(
        document.getElementById("Grouphead")
      )).value;
      const Parenthead = (<HTMLInputElement>document.getElementById("select1"))
        .value;
      const s = Parenthead.split("-");
      const z = s[0];
      const payload1 = {
        z,
        ledgerhead,
        pid,
        HeadName: this.addledgerForm.value.HeadName,
        LheadDesc: this.addledgerForm.value.GheadDesc,
        Type: this.addledgerForm.value.Type,
        Section: this.addledgerForm.value.Section,
      };
      this.admin
        .postrequest(
          environment.baseUrl + "addledger",
          JSON.stringify(payload1),
          this.options
        )
        .subscribe((result: any) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Form submitted sucessfully",
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(["dashboard/hoa"]);
          this.resetForm();
          

        }),
        (error: any) => {
          if (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong.!",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "please fill the form.!",
            });
          }
        };
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "please fill the form.!",
      });
    }
  }

  initForm() {
    this.addledgerForm = this.fb.group({
      Parenthead1: new FormControl("", [Validators.required]),
      Parenthead: new FormControl("", [Validators.required]),
      Grouphead: new FormControl("", [Validators.required]),
      HeadName: new FormControl("", [Validators.required]),
      GheadDesc: new FormControl("", [Validators.required]),
      Type: new FormControl("1", [Validators.required]),
      Section: new FormControl("", [Validators.required]),
      select1: new FormControl("", [Validators.required]),
    });
  }
  resetForm() {
    this.addledgerForm.reset();
  }
  getselect1(pid: any) {
    const payload = {
      pid1: this.pid,
    };
    this.admin
      .postrequest(
        environment.baseUrl + "getselect1",
        JSON.stringify(payload),
        this.options
      )
      .subscribe(
        (result: any) => {
          this.select1 = result;
        },
        (error: any) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed.!",
          });
        }
      );
  }
  getselect() {
    this.admin.getrequest(environment.baseUrl + "getselect").subscribe(
      (result: any) => {
        this.select = result;
      },
      (error: any) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed.!",
        });
      }
    );
  }
  getval(pid: any) {
    if (pid == 1 || pid == 2 || pid == 3 || pid == 4) {
      const pay = {
        pid: this.pid,
      };
      this.admin
        .postrequest(
          environment.baseUrl + "getval",
          JSON.stringify(pay),
          this.options
        )
        .subscribe(
          (result: any) => {
            console.log(result);
            (<HTMLInputElement>document.getElementById("Grouphead")).value =
              result[0].id;
          },
          (error: any) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Failed.!",
            });
          }
        );
    } else {
      const pay = {
        pid: this.pid,
      };
      this.admin
        .postrequest(
          environment.baseUrl + "ge",
          JSON.stringify(pay),
          this.options
        )
        .subscribe(
          (result: any) => {
            console.log(result);
            this.check(result);
            
          },
          (error: any) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Failed.!",
            });
          }
        );
    }
  }
  changeSuit(e: any) {
    this.addledgerForm.get("select1").setValue(e.target.value, {
      onlySelf: true,
    });
  }




  check(lid:any) {
    
    const payload = {
      lid
    };
    console.log(payload);
    this.admin
      .postrequest(
        environment.baseUrl + "checklid",
        JSON.stringify(payload),
        this.options
      )
      .subscribe(
        (result: any) => {
        console.log(result);
        (<HTMLInputElement>document.getElementById("Grouphead")).value =
              result;
        },
        (error: any) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed.!",
          });
        }
      );
  }
}
