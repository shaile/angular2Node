import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgForm, Form } from '@angular/forms';
import { AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  _authService: AuthenticationService;
  model: any = {};
  loading = false;
  error = '';
   constructor(
        private router: Router,
        private authService: AuthenticationService) {
          this._authService = authService;
         }

  ngOnInit() {
     // reset login status
        this._authService.logout();
  }

   login(form: NgForm) {
     console.log('emai='+this.model.email+'  Pass='+this.model.password);
        this.loading = true;
           this._authService.login(this.model)
            .subscribe(result => {              
                if (result) {                    
                    this.router.navigate(['/users']);
                } else {
                    this.error = 'Email or password is incorrect';
                    this.loading = false;
                }
            });
    }

}
