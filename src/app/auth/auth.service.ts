﻿import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from '../user/user';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
    constructor(
      private http: Http,
      private router: Router
    ) { }
    private headers = new Headers({'Content-Type': 'application/json'});

    login(user: User) {
        return this.http.post('/api/users/login', JSON.stringify(user), {headers: this.headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                const res = response.json();
                if (res && res.token) {
                    localStorage.setItem('currentUser', JSON.stringify({token: res.token, id: res.id}));
                }
            });
    }

    logout() {
      localStorage.removeItem('currentUser');
      this.router.navigate(['/login']);
    }

    jwt() {
      const storage = JSON.parse(localStorage.getItem('currentUser'));
      return storage ? storage.token : null;
    }

    userId() {
      const storage = JSON.parse(localStorage.getItem('currentUser'));
      return storage ? storage.id : null;
    }
}
