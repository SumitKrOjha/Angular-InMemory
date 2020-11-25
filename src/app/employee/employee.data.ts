import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee } from './employee';

export class EmployeeData implements InMemoryDbService {

  createDb() {
    const employees: Employee[] = [
      {
        id: 1,
        First_Name: 'Bivek',
        Last_Name: 'Mali',
        Email: "bivekmali1@gmail.com",
        Contact: 9465331980,
        Address: "53 shib Chandra Chaterjee",
        Username: "bivekm",
        Password: "password",
        Gender: 'Male',
        Qualification: 'B.Tech',
        Experience: 2,
        Language: ["C/C++", "Java", "Python", "C#"]

      },
      {
        id: 2,
        First_Name: 'Raju',
        Last_Name: 'Mahato',
        Contact: 1234567890,
        Address: "53  Chandra Chaterjee",
        Username: "raju",
        Password: "password",
        Gender: 'Male',
        Qualification: 'M.Tech',
        Experience: 1,
        Email: "rahu24@gmail.com",
        Language: ["Python", "C#"]
      },

      {
        id: 8,
        First_Name: 'Viru',
        Last_Name: 'Jha',
        Contact: 8854524444,
        Address: "53 shib Chandra Chaterjee",
        Username: "bivekm",
        Password: "password",
        Gender: 'Male',
        Qualification: 'M.Tech',
        Experience: 3,
        Email: "viru65@hotmail.com",
        Language: ['C/C++', 'Python', 'Java']
      },

      {
        id: 7,
        First_Name: 'Aditya',
        Last_Name: 'Rai'
        , Contact: 9163533198,
        Address: "53 shib Chaterjee",
        Username: "adi",
        Password: "password",
        Gender: 'Male',
        Qualification: 'B.CA',
        Experience: 5,
        Email: "adityaroy@gmail.com",
        Language: ["C#"]
      }
    ];
    return { employees };
  }
}
