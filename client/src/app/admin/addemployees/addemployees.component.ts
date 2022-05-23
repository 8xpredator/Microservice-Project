import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { environment } from "../../../environments/environment";
import { AdminService } from "../admin.service";
@Component({
  selector: "app-addemployees",
  templateUrl: "./addemployees.component.html",
  styleUrls: ["./addemployees.component.scss"],
})
export class AddemployeesComponent implements OnInit {
  empForm!: FormGroup;
  mes1: boolean = false;
  mes2: boolean = false;
  mes3: boolean = false;
  show: boolean = false;
  s1: boolean = false;
  length=0;
  options = { headers: { "Content-Type": "application/json", "authorization": `Bearer ${localStorage.getItem("token")}` } };
  constructor(
    private fb: FormBuilder,
    private admin : AdminService 
  ) {
    this.empForm = fb.group({
      status: new FormControl(),
      Name: new FormControl(),
      username: new FormControl(),
      password: new FormControl(),
      repassword: new FormControl(),
      type: new FormControl(),
    });
  }
  ngOnInit(): void {
    this.Init();
  }
  submitForm() {
    const payload1 = {
      status: this.empForm.value.status,
      Name: this.empForm.value.Name,
      username: this.empForm.value.username,
      password: this.empForm.value.password,
      repassword: this.empForm.value.repassword,
      Type: this.empForm.value.type,
    };

    this.admin
      .postrequest(
        environment.baseUrl + "users",
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
        this.Init();
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
            text: " Please fill the form.!",
          });
        }
      };
  }
  resetForm() {
    this.empForm.reset();
    this.Init();
  }
  Init(){
    this.empForm = this.fb.group({
      status: new FormControl("", [Validators.required]),
      Name: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      repassword: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required]),
    });

  }
  captcha_pass() {
    var z = this.empForm.value.password;
    var x = this.empForm.value.repassword;
    if(this.Comparedate(z,x))
    {
      this.s1=false;
    }else{
      this.s1=true;
    }
  }
  Comparedate(a:string,b:string) {   
    if (a != b) 
    {
      return false;
    } 
    else {
      return true;
    }
  }
 check(){
  var a = this.empForm.value.username;
  const payload={a};

  this.admin
      .postrequest(
        environment.baseUrl + "check",
        JSON.stringify(payload),
        this.options
      )
      .subscribe((result: any) => {
        this.length=result.length;
       
        });
       
    
      (error: any) => {
       
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong.!",
          });
        }

 }
}

