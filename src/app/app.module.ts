import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import {  HttpClientModule } from '@angular/common/http';
import { EmployeeData } from './employee/employee.data';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { PageNotFoundComponent } from './PageNotFound.Component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(EmployeeData, { delay: 1000 }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
