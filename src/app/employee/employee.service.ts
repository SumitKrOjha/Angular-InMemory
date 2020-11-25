import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee, EmployeeResolved } from './employee';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  employee: Employee;
  private employeesUrl = 'api/employees';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  arr2: EmployeeResolved
  getEmployee(id: number): Observable<Employee> {
    if (id === 0) {
      return of(this.initializeEmployee());
    }

    const url = `${this.employeesUrl}/${id}`;
    return this.http.get<Employee>(url)
      .pipe(
        tap(data => console.log('getEmployee: ' + JSON.stringify(data)),
          data => this.arr2.employee = JSON.parse(data.toString())),

        catchError(this.handleError)
      );
  }


  deleteEmployee(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.employeesUrl}/${id}`;
    return this.http.delete<Employee>(url, { headers })
      .pipe(
        tap(data => console.log('deleteEmployee: ' + id)),
        catchError(this.handleError)
      );
  }
  updateEmployee(employee: Employee): Observable<Employee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.employeesUrl}/${employee.id}`;
    return this.http.put<Employee>(url, employee, { headers })
      .pipe(
        tap(() => console.log('updateEmployee: ' + employee.id)),
        map(() => employee),
        catchError(this.handleError)
      );
  }
  createEmployee(employee: Employee): Observable<Employee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    employee.id = null;
    return this.http.post<Employee>(this.employeesUrl, employee, { headers })
      .pipe(
        tap(data => console.log('createEmployee: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }


  checkedList(arr2: string[], arr1: string[]): string[] {
    let checkedarray: string[] = [];
    let j: number;
    let i: number;
    for (i = 0; i < arr1.length; i++) {
      for (j = 0; j < arr2.length; j++) {
        if (arr1[i] == arr2[j]) {
          checkedarray.push(arr2[j])
        }
      }

    }
    return checkedarray;
  }
  uncheckedList(arr2: string[], arr1: string[]): string[] {
    let uncheckedarray: string[] = [];
    let j: number;
    let i: number;
    let c: number;
    for (i = 0; i < arr1.length; i++) {
      c = 1;
      for (j = 0; j < arr2.length; j++) {
        if (arr1[i] == arr2[j]) {
          c = 0
          console.log(arr1[i], arr2[j])
        }

      }
      console.log(arr1[i], arr2[j], c)
      if (c == 1) {
        uncheckedarray.push(arr1[i])
      }

    }
    return uncheckedarray;

  }
  emptyarray: string[] = [];
  private initializeEmployee(): Employee {
    return {
      id: 0,
      First_Name: null,
      Last_Name: null,
      Email: null,
      Contact: null,
      Address: null,
      Username: null,
      Password: null,
      Gender: null,
      Experience: null,
      Qualification: null,
      Language: this.emptyarray
    };

  }

  private handleError(err) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
