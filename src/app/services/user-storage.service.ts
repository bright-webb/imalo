import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  getUserData(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
