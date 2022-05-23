import { Component, OnInit } from "@angular/core";
import { navItems } from "../_nav";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { AdminService } from "./admin.service";
@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;
  show: boolean = true;
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  constructor(public admin: AdminService, private router: Router) {}
  ngOnInit(): void {
    document.addEventListener("contextmenu", function (e) {
      e.preventDefault();
    });

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Welcome Admin",
      showConfirmButton: false,
      timer: 1500,
    });

    window.addEventListener("beforeunload", () =>
      localStorage.removeItem("token")
    );
    window.addEventListener("beforeunload", () =>
      localStorage.removeItem("Userid")
    );
    var duration = 1000;

    setInterval(updateTimer, 1000);
    function updateTimer() {
      duration--;
      if (duration < 1) {
        localStorage.removeItem("token");
        location.reload();
      }
    }
    window.addEventListener("mousemove", resetTimer);
    function resetTimer() {
      duration = 1000;
    }
  }
}
