import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html'
})
export class EmployeeEditComponent implements OnInit {
  @ViewChild(NgForm) form: NgForm;

  errorMessage: string;
  default_language: string[] = []
  private currentEmployee: Employee;
  language: string[] = [];

  arr1: string[] = ["C/C++", "Java", "Python", "C#", "PHP"];

  get employee(): Employee {
    return this.currentEmployee;
  }
  set employee(value: Employee) {
    this.currentEmployee = value;
  }



  constructor(private employeeservive: EmployeeService,
    private route: ActivatedRoute,
    private router: Router) { }

  pageTitle: string = 'Employee Edit';
  default_qualification = ["B.Tech", "M.Tech", "B.CA", "M.CA"];
  default_experience = [1, 2, 3, 4, 5, 6];
  Individual: string[];
  ngOnInit(): void {

    let id = +this.route.snapshot.paramMap.get('id');
    this.employeeservive.getEmployee(id).subscribe({
      next: employee => {
        this.employee = employee;
        this.Individual = Object.keys(this.employee.Language).map(i => this.employee.Language[i]);
        if (this.employee.id == 0) {
          this.language = this.arr1;
        }
        else {
          this.default_language = this.employeeservive.checkedList(this.employee.Language, this.arr1);
          this.language = this.employeeservive.uncheckedList(this.employee.Language, this.arr1)
        }
        this.onEmployeeRetrieved(employee);
      },
      error: err => this.errorMessage = err
    });
  }

  private dataIsValid: { [key: string]: boolean } = {};
  isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (this.dataIsValid &&
      Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
  }
  validate(): void {
    this.dataIsValid = {};
    if (this.employee.First_Name &&
      this.employee.First_Name.length >= 3 && this.employee.Contact &&
      this.employee.Contact > 999999999 &&
       this.employee.Last_Name && this.employee.Gender && 
       this.employee.Username && this.employee.Password &&
        this.employee.Qualification && this.employee.Experience) {
      this.dataIsValid['edit'] = true;
    } else {
      this.dataIsValid['edit'] = false;
    }


  }
  onEmployeeRetrieved(employee: Employee): void {
    this.employee = employee;

    if (!this.employee) {
      this.pageTitle = 'No Employee found';
    } else {
      if (this.employee.id === 0) {
        this.pageTitle = 'Add Employee';
      } else {
        this.pageTitle = `Edit Employee: ${this.employee.First_Name}`;
      }
    }
  }

  onChange(name: string, isChecked: boolean) {
    if (isChecked) {
      this.employee.Language.push(name);
    }
    else {
      const z = this.employee.Language.indexOf(name);
      this.employee.Language.splice(z, 1)
    }
  }

  saveEmployee(): void {

    if (this.employee.id === 0) {
      this.employeeservive.createEmployee(this.employee).subscribe({
        next: () => this.onSaveComplete(`The new ${this.employee.First_Name} was saved`),
      });
    } else {
      this.employeeservive.updateEmployee(this.employee).subscribe({
        next: () => this.onSaveComplete(`The updated ${this.employee.First_Name} was saved`),
      });
    }
    this.default_language;
    this.language;

  }

  onSaveComplete(message?: string): void {
    this.router.navigate(['/employees']);
  }

}


