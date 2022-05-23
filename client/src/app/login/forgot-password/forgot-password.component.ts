import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  mes1: boolean = false;
  mes2: boolean = false;
  mes3: boolean = false;
  mes4: boolean = false;
  forgotForm!: FormGroup;

  options = { headers: { "Content-Type": "application/json" } };
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private login: LoginService,
    private router: Router
  ) {
    this.forgotForm = new FormGroup({
      email: new FormControl(),
      randompass: new FormControl()
    });
  }

  ngOnInit(): void {
    this.initForm();
  }
  submitForm() {
    if (this.forgotForm.valid) {
      const payload = {
        username: this.forgotForm.value.email,
      };
      this.login
        .postrequest(
          environment.baseUrl + "forgotpassword",
          JSON.stringify(payload),
          this.options
        )
        .subscribe(
          (result: any) => {
            Swal.fire(
              'Done!',
              'Password send to your mail!',
              'success'
            )
              this.router.navigate(["login"]);
                    
          },
          (error: any) => {
            if (error.status == 500) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Username is wrong try submitting again.",
              });
              this.forgotForm.reset();
            } else{
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong.!",
            });
            this.forgotForm.reset();
          }
    });
  }
}
  back(){
    this.router.navigate(["login"]);
  }
  initForm() {
    this.forgotForm = this.fb.group({
      email: new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ])
      
    })
  }

}

