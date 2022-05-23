import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { environment } from "../../../environments/environment";
import { AdminService } from "../admin.service";
import { Users } from "../model/users";

@Component({
  selector: "app-viewemployee",
  templateUrl: "./viewemployee.component.html",
  styleUrls: ["./viewemployee.component.scss"],
})
export class ViewemployeeComponent implements OnInit {
  totalLength: any;
  page: number = 1;

  users?: Users[];
  constructor(
    private http: HttpClient,
    private admin: AdminService,
    private router1: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getusers();
  }
  getusers() {
    this.admin.getrequest(environment.baseUrl + "users").subscribe(
      (result: any) => {
        this.users = result;
        this.totalLength = result.length;
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
  select(u: any) {
    this.router.navigate(["dashboard/view/edit/", u]);
  }
}
