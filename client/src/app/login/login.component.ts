import { HttpClient, HttpHeaders } from "@angular/common/http";
import { getParseErrors } from "@angular/compiler";
import { Component, OnInit, ɵɵqueryRefresh } from "@angular/core";
import {
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { environment } from "../../environments/environment";
import { LoginService } from "./login.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "login.component.html",
})
export class LoginComponent implements OnInit {
  mes1: boolean = false;
  mes2: boolean = false;
  mes3: boolean = false;
  mes4: boolean = false;
  loginForm!: FormGroup;
  show: boolean = false;
  show1: boolean = false;
  fieldTextType: boolean;
  options = { headers: { "Content-Type": "application/json" } };
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private login: LoginService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      Captcha: new FormControl(),
      enteredCaptcha: new FormControl(),
    });
  }

  ngOnInit() {
    this.getCaptche();
    this.initForm();
    document.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      
    });
  }
  btnClick = function () {
    this.router.navigateByUrl("forgot");
  };
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  submitForm() {
    if (this.loginForm.valid && this.show1) {
      const payload = {
        username: this.loginForm.value.email,
        password: this.loginForm.value.password,
        captcha: this.loginForm.value.enteredCaptcha,
      };
      console.log(JSON.stringify(payload));
      this.login
        .postrequest(
          environment.baseUrl + "login1",
          JSON.stringify(payload),
          this.options
        )
        .subscribe(
          (result: any) => {
            localStorage.setItem("token", result.token);
            localStorage.setItem("Userid", result.Users.rows[0].id);
            if (result.Users.rows[0].type === 1) {
              if(result.Users.rows[0].flag === 1) {
              this.router.navigate(["dashboard/changepassword"]);
              }
              else{
                this.router.navigate(["dashboard/home"]);
              }
            } else {
              if(result.Users.rows[0].flag === 1) {
                this.router.navigate(["cashcounter/changepassword"]);
                }
                else{
                  this.router.navigate(["cashcounter/home"]);
                }
             
            }
          },
          (error: any) => {
            console.log(error);
            if (error.status === 404) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.error.error,
              });
              this.loginForm.reset();
              this.getCaptche();
              this.show = false;
              this.show1 = false;
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.error.errors[0].msg,
              });
              this.loginForm.reset();
              this.getCaptche();
              this.show = false;
              this.show1 = false;
            }
          }
        );
    } else {
      this.getCaptche();
    }
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
      Captcha: new FormControl(""),
      enteredCaptcha: new FormControl("", [
        Validators.required,
        Validators.maxLength(6),
      ]),
    });
  }

  getCaptche() {
    this.login.getrequest(environment.baseUrl + "getcaptcha").subscribe(
      (result: any) => {
        (<HTMLInputElement>document.getElementById("Captcha")).value =
          result.random;
        (<HTMLInputElement>document.getElementById("enteredCaptcha")).value =
          "";
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load captcha.!",
        });
      }
    );
  }
  captcha_valid() {
    var z = (<HTMLInputElement>document.getElementById("Captcha")).value;
    var x = (<HTMLInputElement>document.getElementById("enteredCaptcha")).value;
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

  removeContent() {
    (<HTMLInputElement>document.getElementById("enteredCaptcha")).value = "";
  }
  get f() {
    return this.loginForm.controls;
  }
}
