import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeDataService } from '../employe-data.service';
import { IEmployee } from '../iemployee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeDataService]
})
export class EmployeeComponent implements OnInit {

  _empService: EmployeDataService;
  employees: IEmployee[];
  errorMessage: String;

   constructor(private empService: EmployeDataService, private router: Router) {
    this._empService = empService;
  }

  getUsers(): void {
    this._empService
      .getEmpData()
      .subscribe(res => this.employees = res,
      error => this.errorMessage = <any>error);
  }

    deletUser(id: string) {
    if (confirm('Are you sure to delete?'+id)) {
      this._empService.deleteUser(id).subscribe((res) => {
       window.location.reload();
      });
    }
  }
  ngOnInit() {
    this.getUsers();
  }

}
