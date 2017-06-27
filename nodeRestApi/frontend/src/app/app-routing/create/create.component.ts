import { Router, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm, Form } from '@angular/forms';
import { Observable } from 'rxjs';
import { EmployeDataService } from '../../employe-data.service';
import { IEmployee } from '../../iemployee';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [EmployeDataService]
})
export class CreateComponent implements OnInit {
  _empService: EmployeDataService;
  employees: IEmployee[];
  errorMessage: String;
  
  user = {
    name:'',
    address:'',
    email:'',
    phone:''
  }

  constructor(private empService: EmployeDataService, private router: Router) {
    this._empService = empService;
  }



  createUser(form: NgForm){
      this._empService.addEmpData(this.user).subscribe((res) => {
        this.router.navigate(['/users']);
      });
  }

  ngOnInit() {
  }
}
