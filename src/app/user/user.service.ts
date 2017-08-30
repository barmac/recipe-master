import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from './user';

@Injectable()
export class UserService {
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  create(user: User) {
    return this.http.post('/api/users', user, this.headers).map((response: Response) => response.json());
  }
}
