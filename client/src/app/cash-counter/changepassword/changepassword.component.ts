import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { CashcounterService } from '../cashcounter.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  mes1: boolean = false;
  mes2: boolean = false;
  mes3: boolean = false;
  mes4: boolean = false;
  show: boolean = false;
  show1: boolean = false;
  fieldTextType: boolean;
  fieldTextType1: boolean;
  changeForm!: FormGroup;
  options = { headers: { "Content-Type": "application/json" } };
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private cashcounter: CashcounterService,
    private router: Router
  ) {
    this.changeForm = new FormGroup({
      password: new FormControl(),
      repassword: new FormControl()
    });
  }

  ngOnInit(): void {
    this.initForm();
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1;
  }
  resetForm(){
    this.changeForm.reset();

  }
  submitForm() {
    if (this.changeForm.valid) {
     let userid=localStorage.getItem('Userid');
     
      const payload = {
        userid,
        password: this.changeForm.value.password,
      };
      this.cashcounter
        .postrequest(
          environment.baseUrl + "changepassword",
          JSON.stringify(payload),
          this.options
        )
        .subscribe(
          (result: any) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Password updated sucessfully",
              showConfirmButton: false,
              timer: 1500,
            });
            this.resetForm();
          }),
          (error: any) => {
        
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.error.error,
              });
            
            }
          } 
  }
  initForm() {
    this.changeForm = this.fb.group({
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
      repassword: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ])
      
    })
  }
  password_valid(){
    var z = (<HTMLInputElement>document.getElementById("password")).value;
    var x = (<HTMLInputElement>document.getElementById("repassword")).value;
    if (x.length == 0) {
      this.show = false;
      this.show1 = false;
    } else {
      if(z==x){
        this.show1=true;
        this.show = false;
      }else{
        this.show1=false;
        this.show = true;

      }
    }
    
  }
 }

