import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { PageNotFoundComponent } from './PageNotFound.Component';

import { SelectiveStrategy } from './selective-strategy.service';



@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'employees', component: EmployeeComponent },
    {
      path: 'employees',
      data: { preload: false },
      loadChildren: () =>
        import('./employee/employee.module').then(m => m.EmployeeModule)
    },
    { path: '', redirectTo: 'employees', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }

  ], { enableTracing: true, preloadingStrategy: SelectiveStrategy })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
