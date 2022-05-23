import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-addparty',
  templateUrl: './addparty.component.html',
  styleUrls: ['./addparty.component.scss']
})
export class AddpartyComponent implements OnInit {

  partyForm!: FormGroup;
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
    this.partyForm = fb.group({
      Name: new FormControl()
    });
  }
  ngOnInit(): void {
    this.Init();
  }
  submitForm() {
    const payload1 = {
      Name: this.partyForm.value.Name,
    };

    this.admin
      .postrequest(
        environment.baseUrl + "addparty",
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
    this.partyForm.reset();
    this.Init();
  }
  Init(){
    this.partyForm = this.fb.group({
      Name: new FormControl("", [Validators.required])
    });

  }
 

}





  