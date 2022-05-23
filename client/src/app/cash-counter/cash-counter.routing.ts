import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth.guard";
import { ApprovalComponent } from "./approval/approval.component";
import { CancelComponent } from "./cancel/cancel.component";
import { CancellationComponent } from "./cancellation/cancellation.component";
import { CashCounterComponent } from "./cash-counter.component";
import { ChangepasswordComponent } from "./changepassword/changepassword.component";
import { FilterComponent } from "./filter/filter.component";
import { HomeComponent } from "./home/home.component";
import { PendingComponent } from "./pending/pending.component";
import { PrintComponent } from "./print/print.component";
import { ReceiptsComponent } from "./receipts/receipts.component";
import { RejectedComponent } from "./rejected/rejected.component";
import { ReportsComponent } from "./reports/reports.component";
import { ReprintComponent } from "./reprint/reprint.component";
import { VerificationComponent } from "./verification/verification.component";
export const routes: Routes = [
    {
        path: "cashcounter",
        component: CashCounterComponent,
        canActivate:[AuthGuard],
        data: {
          title: "Cash Counter",
        },
        children: [
          {
            path: "home",
            component: HomeComponent,
            canActivate:[AuthGuard],
            data: {
              title: "Home",
            },
          },
          {
            path: "receipts",
            component: ReceiptsComponent,
            canActivate:[AuthGuard],
            data: {
              title: "Home / Receipts",
            },
          },
          {
            path: "receipts/:id",
            component: ReceiptsComponent,
            canActivate:[AuthGuard],
            data: {
              title: "Home / Receipts",
            },
          },
          {
            path: "verify",
            component: VerificationComponent,
            canActivate:[AuthGuard],
            data: {
              title: "Home / Verified Receipts",
            },
          },
          {
            path: "approval",
            component: ApprovalComponent,
            canActivate:[AuthGuard],
            data: {
              title: "Home / Approval",
            },
          },
          {
            path: "print/:id",
            component: PrintComponent,
            canActivate:[AuthGuard],
            data: {
              title: "Home / Print Receipt",
            },
          },
          {
            path: "reject",
            component: RejectedComponent,
            canActivate:[AuthGuard],
            data: {
              title: "Home / Rejected",
            },
          },
          {
            path: "pending",
            component: PendingComponent,
            canActivate:[AuthGuard],
            data: {
              title: "Home / Pending",
            },
          },
          {
            path: "reprint",
            component: ReprintComponent,
            canActivate:[AuthGuard],
            data: {
              title: "Home / Reprint Receipt",
            },
          },
          {
            path: "filter",
            component: FilterComponent,
            canActivate:[AuthGuard],
            data: {
              title: "Home / Filter Receipt",
            },
          },
          {
            path: "cancel",
            component: CancelComponent,
            canActivate:[AuthGuard],
            data: {
              title: "Home / Cancel Receipt",
            },
          },
          {
            path: "report",
            component: ReportsComponent,
            canActivate:[AuthGuard],
            data: {
              title: "Home / Report",
            },
          },
          {
            path: "changepassword",
            component: ChangepasswordComponent,
            canActivate:[AuthGuard],
            data: {
              title: "change password",
            },
          },
        ],
      },
]   
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class CashcounterRoutingModule {}
