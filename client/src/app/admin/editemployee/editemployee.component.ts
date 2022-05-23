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
import Swal from "sweetalert2";
import { environment } from "../../../environments/environment";
import { AdminService } from "../admin.service";
import { Users1 } from "../model/users";

@Component({
  selector: "app-editemployee",
  templateUrl: "./editemployee.component.html",
  styleUrls: ["./editemployee.component.scss"],
})
export class EditemployeeComponent implements OnInit {
  public id: any;
  users?: Users1[];
  editForm!: FormGroup;
  mes1: boolean = false;
  mes2: boolean = false;
  mes3: boolean = false;
  show: boolean = false;
  options = { headers: { "Content-Type": "application/json", "authorization": `Bearer ${localStorage.getItem("token")}` } };
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private admin: AdminService,
    private router1: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = new FormGroup({
      Name: new FormControl(),
      username: new FormControl(),
      type: new FormControl(),
      status: new FormControl(),
    });
  }
  ngOnInit(): void {
    let id = parseInt(this.router1.snapshot.paramMap.get("id"));
    this.id = id;
    this.getdata(id);
    //this.editForm.patchValue({Name:'{name}'})
  }
  submitForm() {
    let id = parseInt(this.router1.snapshot.paramMap.get("id"));
    this.id = id;
    const Type = (<HTMLInputElement>document.getElementById("select2")).value;
    const status = (<HTMLInputElement>document.getElementById("select1")).value;
    //var Type=e.value;
    const payload1 = {
      Name: this.editForm.value.Name,
      username: this.editForm.value.username,
      Type,
      status,
      id,
    };
    this.admin
      .postrequest(
        environment.baseUrl + "editusers",
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
            text: "Please fill the form.!",
          });
        }
      };
  }
  resetForm() {
    this.editForm.reset();
  }
  getdata(id: any) {
    const payload = {
      id,
    };
    this.admin
      .postrequest(
        environment.baseUrl + "getdata",
        JSON.stringify(payload),
        this.options
      )
      .subscribe(
        (result: any) => {
          this.users = result;
          this.editForm.patchValue({ Name: result[0].name });
          this.editForm.patchValue({ username: result[0].username });
          //this.editForm.patchValue({Type:result[0].type});
          //this.editForm.patchValue({status:result[0].status});
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
