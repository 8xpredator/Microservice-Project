import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ButtonsModule } from "ngx-bootstrap/buttons";
import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from "@coreui/angular";
import { TokenInterceptorService } from "../service/token-interceptor.service";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { AddemployeesComponent } from "./addemployees/addemployees.component";
import { AddgroupComponent } from "./addgroup/addgroup.component";
import { AddledgerComponent } from "./addledger/addledger.component";
import { EditemployeeComponent } from "./editemployee/editemployee.component";
import { HoaComponent } from "./hoa/hoa.component";
import { ViewemployeeComponent } from "./viewemployee/viewemployee.component";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { NgxPaginationModule } from "ngx-pagination";
import { HomeComponent } from './home/home/home.component';
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { AddtypeComponent } from './addtype/addtype.component';
import { EdittypeComponent } from './edittype/edittype.component';
import { ViewtypeComponent } from './viewtype/viewtype.component';
import { AddpartyComponent } from './addparty/addparty.component';
import { ViewpartyComponent } from './viewparty/viewparty.component';
import { EditpartyComponent } from './editparty/editparty.component';

@NgModule({
  declarations: [
    HoaComponent,
    AddgroupComponent,
    AddledgerComponent,
    AddemployeesComponent,
    ViewemployeeComponent,
    EditemployeeComponent,
    HomeComponent,
    ChangepasswordComponent,
    AddtypeComponent,
    EdittypeComponent,
    ViewtypeComponent,
    AddpartyComponent,
    ViewpartyComponent,
    EditpartyComponent,
  ],
  imports: [
    CollapseModule,
    NgxPaginationModule,
    CommonModule,
    FormsModule,
    ChartsModule,
    BsDropdownModule,
    CarouselModule.forRoot(),
    ButtonsModule.forRoot(),
    AppBreadcrumbModule,
    AppBreadcrumbModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppAsideModule,
    AppHeaderModule,
    AppFooterModule,
    AppSidebarModule,
  ],
})
export class AdminModule {}
