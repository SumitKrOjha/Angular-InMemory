import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {

  pageTitle = 'Employee List';
  errorMessage = '';
  employees: Employee[] = [];
  employee: Employee;

  constructor(private employeeservice: EmployeeService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.employeeservice.getEmployees().subscribe({
      next: employees => {
        this.employees = employees;

      },

      error: err => this.errorMessage = err
    });
  }
  onProductRetrieved(employees: Employee) {
    this.employee = employees;
  }
  deleteEmployee(employee: Employee): void {
    if (confirm(`Really delete the Employee: ${employee.First_Name}?`)) {
      this.employeeservice.deleteEmployee(employee.id).subscribe({
        next: () => this.onSaveComplete(`${employee.First_Name} was deleted`),
        error: err => this.errorMessage = err
      }

      );
      this.ngOnInit();
    }
  }

  onSaveComplete(message?: string): void {

    this.router.navigate(['employees']);
  }
}





