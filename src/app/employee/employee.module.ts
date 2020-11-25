import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [EmployeeEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: ':id/edit',
        component: EmployeeEditComponent
      }

    ])
  ]
})
export class EmployeeModule { }
