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
import { AdminService } from "../admin.service";
import { Select, Select1 } from "../model/Select";
@Component({
  selector: "app-addgroup",
  templateUrl: "./addgroup.component.html",
  styleUrls: ["./addgroup.component.scss"],
})
export class AddgroupComponent implements OnInit {
  addgroupForm!: FormGroup;
  public receipts: any[];
  select?: Select[];
  select1?: Select1[];
  options = { headers: { "Content-Type": "application/json", "authorization": `Bearer ${localStorage.getItem("token")}` } };
  public pid;
  constructor(
    private fb: FormBuilder,
    private admin: AdminService,
    private router1: ActivatedRoute,
    private router: Router
  ) {
    this.addgroupForm = new FormGroup({
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
    if (this.addgroupForm.invalid) {
      if (this.pid == 1 || this.pid == 2 || this.pid == 3 || this.pid == 4) {}
      else{
      if (this.pid > 0 && this.pid < 200000000000000) {
        this.pid = 1;
      } else if (this.pid > 200000000000000 && this.pid < 300000000000000) {
        this.pid = 2;
      } else if (this.pid > 300000000000000 && this.pid < 400000000000000) {
        this.pid = 3;
      } else {
        this.pid = 4;
      }
    }
      const pid = this.pid;
      const Grouphead = (<HTMLInputElement>document.getElementById("Grouphead"))
        .value;
      const Parenthead = (<HTMLInputElement>document.getElementById("select1"))
        .value;
      const s = Parenthead.split("-");
      const z = s[0];
      const payload1 = {
        Parenthead,
        Grouphead,
        pid,
        z,
        HeadName: this.addgroupForm.value.HeadName,
        GheadDesc: this.addgroupForm.value.GheadDesc,
        Type: this.addgroupForm.value.Type,
        Section: this.addgroupForm.value.Section,
      };
      // console.log(payload1)
      this.admin
        .postrequest(
          environment.baseUrl + "addgroup",
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
          this.resetForm();
          this.router.navigate(["dashboard/hoa"]);
        }),
        (error: any) => {
          if (error.status===401) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.error.error,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Please fill the form.!",
            });
          }
        };
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill the form.!",
      });
    }
  }

  initForm() {
    this.addgroupForm = this.fb.group({
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
    this.addgroupForm.reset();
  }
  getselect1(pid: any) {
    let pid1 = 0;

    if (pid == 1) {
      pid1 = 100000000000000;
    } else if (pid == 2) {
      pid1 = 200000000000000;
    } else if (pid == 3) {
      pid1 = 300000000000000;
    } else if (pid == 4) {
      pid1 = 400000000000000;
    } else {
      pid1 = this.pid;
    }
    const payload = {
      pid1
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
            text: "Something went wrong.!",
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
          text: "Something went wrong.!",
        });
      }
    );
  }
  getval(pid: any) {
    if (pid == 1 || pid == 2 || pid == 3 || pid == 4) {
       const pay = {
        pid
      };
      this.admin
        .postrequest(
          environment.baseUrl + "getval",
          JSON.stringify(pay),
          this.options
        )
        .subscribe(
          (result: any) => {
            this.check(result);
          },
          (error: any) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong.!",
            });
          }
        );
    } else {
      pid = pid + 1000000001000;
      const pay = {
        pid: this.pid,
      };
      this.admin
        .postrequest(
          environment.baseUrl + "ge1",
          JSON.stringify(pay),
          this.options
        )
        .subscribe(
          (result: any) => {
            this.check(result);
          },
          (error: any) => {
            console.log(error)
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong.!",
            });
          }
        );
    }
  }
  changeSuit(e: any) {
    this.addgroupForm.get("select1").setValue(e.target.value, {
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
