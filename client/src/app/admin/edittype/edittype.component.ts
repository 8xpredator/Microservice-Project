import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { AdminService } from '../admin.service';
import { Type } from '../model/users';

@Component({
  selector: 'app-edittype',
  templateUrl: './edittype.component.html',
  styleUrls: ['./edittype.component.scss']
})
export class EdittypeComponent implements OnInit {

  public id: any;
  users?: Type[];
  edittype!: FormGroup;
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
    this.edittype = new FormGroup({
      Name: new FormControl()
    });
  }
  ngOnInit(): void {
    let id = parseInt(this.router1.snapshot.paramMap.get("id"));
    this.id = id;
    this.getdata(id);
    //this.edittype.patchValue({Name:'{name}'})
  }
  submitForm() {
    let id = parseInt(this.router1.snapshot.paramMap.get("id"));
    this.id = id;
    const payload1 = {
      Name: this.edittype.value.Name,
     id
    };
    this.admin
      .postrequest(
        environment.baseUrl + "edittype",
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
    this.edittype.reset();
  }
  getdata(id: any) {
    const payload = {
      id,
    };
    this.admin
      .postrequest(
        environment.baseUrl + "showtype",
        JSON.stringify(payload),
        this.options
      )
      .subscribe(
        (result: any) => {
          this.users = result;
          this.edittype.patchValue({ Name: result[0].type_remittance });
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



 