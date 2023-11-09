import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/commont/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private url = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  registerUser(formData: any){
    return this.http.post(`${url}/register`, formData);
  }
}
