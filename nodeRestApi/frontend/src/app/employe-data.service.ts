import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { IEmployee } from './iemployee';

@Injectable()
export class EmployeDataService {

  headers: Headers;
  baseAddress: string = 'http://localhost:8000/';

  constructor(private client: Http) {
    this.headers = new Headers({
       'Content-Type': 'application/json',
       'Access-Control-Allow-Origin': '*',
       'Access-Control-Allow-Credentials':true,
       'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
       'Access-Control-Allow-Headers':'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
       });
  }

  
  getEmpData(): Observable<IEmployee[]> {
    return this.client
      .get(this.baseAddress + "users", { headers: this.headers })
      .map((res: Response) => {
        let employees = res.json();
        console.log(employees);
        return employees;
      });
  }

  addEmpData(data: any): Observable<Response> {
    return this.client
      .post(this.baseAddress + "add", JSON.stringify(data), { headers: this.headers })
      .catch((error: any) => Observable.throw('Server error'));
  }

   deleteUser(id): Observable<Response> {
    let url = this.baseAddress + "user/" + id ;
    return this.client
      .delete(url)
      .catch((error: any) => Observable.throw('Server error'));
  }
}
