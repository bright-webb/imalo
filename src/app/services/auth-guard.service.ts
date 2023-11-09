import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) { }
  canActivate(): boolean {
    const user = localStorage.getItem('user');
    if(user){
      return true;
    }
    else{
      this.router.navigate(['/']);
      return false;
    }
  }

  isAuthenticated(): boolean {
    const user = localStorage.getItem('user');
    const currentUrl = this.router.url;
    if(!user && currentUrl !== '/login' && currentUrl !== '/register'){
      this.router.navigate(['/']);
      return !!user;
    }
    return true;
  }

  public logout(): void{
    localStorage.clear();
    window.location.href = "/";
  }
}
