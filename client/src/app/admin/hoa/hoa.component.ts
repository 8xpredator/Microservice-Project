import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { environment } from "../../../environments/environment";
import { AdminService } from "../admin.service";
import {
  Grouphead1,
  Grouphead2,
  Grouphead3,
  Grouphead4,
} from "../model/grouphead";

@Component({
  selector: "app-hoa",
  templateUrl: "./hoa.component.html",
  styleUrls: ["./hoa.component.scss"],
})
export class HoaComponent implements OnInit {
  grouphead1?: Grouphead1[];
  grouphead2?: Grouphead2[];
  grouphead3?: Grouphead3[];
  grouphead4?: Grouphead4[];
  constructor(
    private admin: AdminService,
    private router: Router,
    private http: HttpClient
  ) {}
  isCollapsed1: boolean = false;
  isCollapsed2: boolean = true;
  isCollapsed3: boolean = true;
  isCollapsed4: boolean = true;

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  ngOnInit(): void {
    this.getgrouphead1();
    this.getgrouphead2();
    this.getgrouphead3();
    this.getgrouphead4();
  }
  onSelect(grouphead) {
    // alert("a");
    if (grouphead == 1 || grouphead == 2 || grouphead == 3 || grouphead == 4) {
      this.router.navigate(["dashboard/hoa/addgroup/", grouphead]);
    } else {
      this.router.navigate(["dashboard/hoa/addgroup/", grouphead.id]);
    }
  }
  onSelect1(grouphead) {
    // alert("a");
    if (grouphead == 1 || grouphead == 2 || grouphead == 3 || grouphead == 4) {
      this.router.navigate(["dashboard/hoa/addledger/", grouphead]);
    } else {
      this.router.navigate(["dashboard/hoa/addledger/", grouphead.id]);
    }
  }

  getgrouphead1() {
    this.admin
      .getrequest(environment.baseUrl + "getgrouphead")
      .subscribe(
        (result: any) => {
          this.grouphead1 = result;
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
  getgrouphead2() {
    this.admin
      .getrequest(environment.baseUrl + "getgrouphead1")
      .subscribe(
        (result: any) => {
          this.grouphead2 = result;
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
  getgrouphead3() {
    this.admin
      .getrequest(environment.baseUrl + "getgrouphead2")
      .subscribe(
        (result: any) => {
          this.grouphead3 = result;
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
  getgrouphead4() {
    this.admin
      .getrequest(environment.baseUrl + "getgrouphead3")
      .subscribe(
        (result: any) => {
          this.grouphead4 = result;
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
}
