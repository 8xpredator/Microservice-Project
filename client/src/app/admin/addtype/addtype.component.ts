import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-addtype',
  templateUrl: './addtype.component.html',
  styleUrls: ['./addtype.component.scss']
})
export class AddtypeComponent implements OnInit {
  typeForm!: FormGroup;
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
    this.typeForm = fb.group({
      Name: new FormControl()
    });
  }
  ngOnInit(): void {
    this.Init();
  }
  submitForm() {
    const payload1 = {
      Name: this.typeForm.value.Name,
    };

    this.admin
      .postrequest(
        environment.baseUrl + "addtype",
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
    this.typeForm.reset();
    this.Init();
  }
  Init(){
    this.typeForm = this.fb.group({
      Name: new FormControl("", [Validators.required])
    });

  }
 

}





  