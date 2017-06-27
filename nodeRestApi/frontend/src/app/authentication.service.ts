import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
   headers: Headers;
   baseAddress: string = 'http://localhost:8000/';
    constructor(private http: Http) {
       this.headers = new Headers({
       'Content-Type': 'application/json',
       'Access-Control-Allow-Origin': '*',
       'Access-Control-Allow-Credentials':true,
       'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
       'Access-Control-Allow-Headers':'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
       });
     }

    login(data: any) {
        return this.http
        .post(this.baseAddress + "login/", JSON.stringify(data), { headers: this.headers })
        .catch((error: any) => Observable.throw('Server error'));


        // return this.http.post(this.baseAddress+'login/', JSON.stringify(data),this.headers)
        //     .map((response: Response) => {
        //         // login successful if there's a jwt token in the response
        //         let user = response.json();
        //         console.log(user[0].uID);
        //         //if (user && user.token) {
        //         if (user[0].uID > 0) {
        //             // store user details and jwt token in local storage to keep user logged in between page refreshes
        //             localStorage.setItem('currentUser', JSON.stringify(user));
        //         }
        //     });
    }

    

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}