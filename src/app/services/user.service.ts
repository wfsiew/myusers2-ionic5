import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseuri = 'https://reqres.in';

  constructor(
    public http: HttpClient
  ) { }

  createUser(o: User) {
    const uri = `${this.baseuri}/api/users`;
    const k = {
      name: `${o.first_name} ${o.last_name}`,
      job: 'doctor'
    };
    return this.http.post(uri, k);
  }

  getUsers(page: number) {
    let prm: HttpParams = new HttpParams()
      .set('page', page.toString())
      .set('per_page', '50');
    const uri = `${this.baseuri}/api/users`;
    return this.http.get(uri, { params: prm }).pipe(map(k => {
      return k['data'];
    }));
  }

  getUser(id) {
    const uri = `${this.baseuri}/api/users/${id}`;
    return this.http.get(uri).pipe(map(k => {
      return k['data'];
    }));
  }

  updateUser(o: User) {
    const uri = `${this.baseuri}/api/users/${o.id}`;
    const k = {
      name: `${o.first_name} ${o.last_name}`,
      job: 'bitch'
    };
    return this.http.put(uri, k);
  }

  deleteUser(id) {
    const uri = `${this.baseuri}/api/users/${id}`;
    return this.http.delete(uri);
  }
}
