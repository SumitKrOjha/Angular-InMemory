export interface Employee {
    id: number;
    First_Name: string;
    Last_Name:string;
    Email: string;
    Contact :number;
    Address : string;
    Username : string;
    Password : string;
    Gender: string;
    Qualification: string;
    Experience: number;
    Language?: string[];
}
export interface EmployeeResolved {
    employee: Employee;
    error?: any;
}
