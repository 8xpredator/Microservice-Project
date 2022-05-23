import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { AdminService } from '../admin.service';
import { Party } from '../model/users';

@Component({
  selector: 'app-editparty',
  templateUrl: './editparty.component.html',
  styleUrls: ['./editparty.component.scss']
})
export class EditpartyComponent implements OnInit {
  public id: any;
  users?: Party[];
  editparty!: FormGroup;
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
    this.editparty = new FormGroup({
      Name: new FormControl()
    });
  }
  ngOnInit(): void {
    let id = parseInt(this.router1.snapshot.paramMap.get("id"));
    this.id = id;
    this.getdata(id);
    //this.editparty.patchValue({Name:'{name}'})
  }
  submitForm() {
    let id = parseInt(this.router1.snapshot.paramMap.get("id"));
    this.id = id;
    const payload1 = {
      Name: this.editparty.value.Name,
     id
    };
    this.admin
      .postrequest(
        environment.baseUrl + "editparty",
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
    this.editparty.reset();
  }
  getdata(id: any) {
    const payload = {
      id,
    };
    this.admin
      .postrequest(
        environment.baseUrl + "showparty",
        JSON.stringify(payload),
        this.options
      )
      .subscribe(
        (result: any) => {
          this.users = result;
          this.editparty.patchValue({ Name: result[0].party_category });
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



 