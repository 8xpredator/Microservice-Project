import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth.guard";
import { AddemployeesComponent } from "./addemployees/addemployees.component";
import { AddgroupComponent } from "./addgroup/addgroup.component";
import { AddledgerComponent } from "./addledger/addledger.component";
import { AddpartyComponent } from "./addparty/addparty.component";
import { AddtypeComponent } from "./addtype/addtype.component";
import { AdminComponent } from "./admin.component";
import { ChangepasswordComponent } from "./changepassword/changepassword.component";
import { EditemployeeComponent } from "./editemployee/editemployee.component";
import { EditpartyComponent } from "./editparty/editparty.component";
import { EdittypeComponent } from "./edittype/edittype.component";
import { HoaComponent } from "./hoa/hoa.component";
import { HomeComponent } from "./home/home/home.component";
import { ViewemployeeComponent } from "./viewemployee/viewemployee.component";
import { ViewpartyComponent } from "./viewparty/viewparty.component";
import { ViewtypeComponent } from "./viewtype/viewtype.component";

export const routes: Routes = [
  {
    path: "dashboard",
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Home",
    },
    children: [
      {
        path: "home",
        component: HomeComponent,
        canActivate: [AuthGuard],
        data: {
          title: "Home",
        },
      },
      {
        path: "hoa",
        component: HoaComponent,
        canActivate: [AuthGuard],
        data: {
          title: "Home / Head Of Account",
        },
      },
      {
        path: "hoa/addgroup/:id",
        component: AddgroupComponent,
        canActivate: [AuthGuard],
        data: {
          title: "Home / Head of account / Add Group Head",
        },
      },
      {
        path: "hoa/addledger/:id",
        component: AddledgerComponent,
        canActivate: [AuthGuard],
        data: {
          title: "Home / Head of account / Add Ledger Head",
        },
      },
      {
        path: "register",
        component: AddemployeesComponent,
        canActivate: [AuthGuard],
        data: {
          title: "Home / Add Employee",
        },
      },
      {
        path: "view",
        component: ViewemployeeComponent,
        canActivate: [AuthGuard],
        data: {
          title: "Home / View Employee",
        },
      },
      {
        path: "view/edit/:id",
        component: EditemployeeComponent,
        canActivate: [AuthGuard],
        data: {
          title: "Home / Edit Employee",
        },
      },
      {
        path: "changepassword",
        component: ChangepasswordComponent,
        canActivate: [AuthGuard],
        data: {
          title: "change password",
        },
      },
      {
        path: "addtype",
        component: AddtypeComponent,
        canActivate: [AuthGuard],
        data: {
          title: "Add Type",
        },
      },
      {
        path: "viewtype",
        component: ViewtypeComponent,
        canActivate: [AuthGuard],
        data: {
          title: "Add Type",
        },
      },
      {
        path: "viewtype/edit/:id",
        component: EdittypeComponent,
        canActivate: [AuthGuard],
        data: {
          title: "Home / Edit Employee",
        },
      },
      {
        path: "addparty",
        component: AddpartyComponent,
        canActivate: [AuthGuard],
        data: {
          title: "Add Type",
        },
      },
      {
        path: "viewparty",
        component: ViewpartyComponent,
        canActivate: [AuthGuard],
        data: {
          title: "Add Type",
        },
      },
      {
        path: "viewparty/edit/:id",
        component: EditpartyComponent,
        canActivate: [AuthGuard],
        data: {
          title: "Home / Edit Employee",
        },
      },

    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
