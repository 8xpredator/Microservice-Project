import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {
  CommonModule,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import {
  IconModule,
  IconSetModule,
  IconSetService,
} from "@coreui/icons-angular";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};
import { AppComponent } from "./app.component";
// Import containers
import { AdminModule } from "./admin/admin.module";
const APP_CONTAINERS = [AdminComponent];
import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from "@coreui/angular";

// Import routing module
import { AppRoutingModule } from "./app.routing";

// Import 3rd party components
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TabsModule } from "ngx-bootstrap/tabs";
import { ChartsModule } from "ng2-charts";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AdminComponent } from "./admin/admin.component";
import { LoginModule } from "./login/login.module";
import { CashCounterComponent } from "./cash-counter/cash-counter.component";
import { AuthGuard } from "./auth.guard";
import { TokenInterceptorService } from "./service/token-interceptor.service";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { NgxPaginationModule } from "ngx-pagination";
import { CashCounterModule } from "./cash-counter/cash-counter.module";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    IconModule,
    IconSetModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    LoginModule,
    CollapseModule,
    FormsModule,
    CommonModule,
    CashCounterModule,
    NgxPaginationModule,
    AdminModule,
  ],
  declarations: [AppComponent, ...APP_CONTAINERS, CashCounterComponent],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    IconSetService,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
