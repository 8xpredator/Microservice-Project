import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { LoginComponent } from "./login.component";


export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
    data: {
      title: "Login Page",
    },
  },
  {
    path: "forgot",
    component: ForgotPasswordComponent,
    data: {
      title: "Forgot password Page",
    },
  },
]   
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
