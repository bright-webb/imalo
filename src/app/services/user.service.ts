import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  registerUser(formData: any){
    return this.http.post(`${this.url}/register`, formData);
  }

  loginUser(formData: any){
    return this.http.post(`${this.url}/login`, formData);
  }

userData(): Observable<any> {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + token)
        .set('Content-Type', 'application/json');
      const requestOptions = { headers: headers };
      return this.http.get(`${this.url}/user`, requestOptions).pipe(
        map((response: any) => {
          return response;
        })
      );
    } else {
      return new Observable<any>(); // Return an empty observable if there is no token
    }
  }

}
