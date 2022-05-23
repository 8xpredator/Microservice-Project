import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AlertModule } from 'ngx-bootstrap/alert';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginRoutingModule } from './login.routing';
import { CashcounterRoutingModule } from '../cash-counter/cash-counter.routing';
import { AdminRoutingModule } from '../admin/admin.routing';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule,
    LoginRoutingModule,
    CashcounterRoutingModule,
    AdminRoutingModule
  ]
})
export class LoginModule { }
