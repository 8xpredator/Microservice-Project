import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VerificationComponent } from "./verification/verification.component";
import { ReceiptsComponent } from "./receipts/receipts.component";
import { ApprovalComponent } from "./approval/approval.component";
import { ReprintComponent } from "./reprint/reprint.component";
import { CancellationComponent } from "./cancellation/cancellation.component";
import { ReportsComponent } from "./reports/reports.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ButtonsModule } from "ngx-bootstrap/buttons";
import { AppBreadcrumbModule } from "@coreui/angular";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { PrintComponent } from "./print/print.component";
import { ModalModule } from "ngx-bootstrap/modal";
import { NgxPrintModule } from "ngx-print";
import { PendingComponent } from "./pending/pending.component";
import { RejectedComponent } from "./rejected/rejected.component";
import { FilterComponent } from "./filter/filter.component";
import { NgxPaginationModule } from "ngx-pagination";
import { ModalComponent } from "./modal/modal.component";
import { HomeComponent } from "./home/home.component";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { CashcounterRoutingModule } from "./cash-counter.routing";
import { ChangepasswordComponent } from "./changepassword/changepassword.component";
import { CancelComponent } from './cancel/cancel.component';
import { QRCodeModule } from "angularx-qrcode";
import { NgxQRCodeModule } from "ngx-qrcode2";

@NgModule({
  declarations: [
    VerificationComponent,
    ReceiptsComponent,
    ApprovalComponent,
    ReprintComponent,
    CancellationComponent,
    ReportsComponent,
    PrintComponent,
    PendingComponent,
    RejectedComponent,
    FilterComponent,
    ModalComponent,
    HomeComponent,
    ChangepasswordComponent,
    CancelComponent
  ],
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    ModalModule.forRoot(),
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    AppBreadcrumbModule.forRoot(),
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPrintModule,
    NgxPaginationModule,
    CashcounterRoutingModule,
    QRCodeModule,
    NgxQRCodeModule
   
  ],
})
export class CashCounterModule {}
