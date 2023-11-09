import {Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
	providedIn: 'root'
})

export class Helper {
	constructor(private auth: AuthGuardService, private toastr: ToastrService) {}
	capitalize(word: string): string {
		if(!word) return '';
		return word.charAt(0).toUpperCase() + word.slice(1);
	}

	getName(user: any): string {
	  if (this.auth.isAuthenticated()) {
	    const fname = user.firstName;
	    const lname = user.lastName;
	    const name = fname + ' ' + lname;
	    return this.capitalize(name);
	  }
	  return '';
	}

	getToken(): string | null {
	  const token = localStorage.getItem('token');
	  if (token !== null && token !== undefined) {
	    return token;
	  } else {
	    return null;
	  }
	}


   // function to display error if form input is empty
	showErrorIfInvalid(form: any, controlName: string, errorMessage: string) {
	  const control = form.controls[controlName];
	  if (control && control.errors && control.errors.required) {
	    this.toastr.error(errorMessage, 'Form Error');
	  }
	}

		// function to display error if form input minimum length is not met
	   showErrorIfInvalidMinLength(form: any, controlName: string, minLength: number, errorMessage: string) {
	    const control = form.controls[controlName];
	    if (control?.errors && (control.errors['required'] || (control.errors['minlength'] && control.errors['minlength'].requiredLength < minLength))) {
	      this.toastr.error(errorMessage, 'Form Error');
	    }
	  }

	  // function to display error if form input maximum length is not met
	  showErrorIfInvalidMaxLength(form: any, controlName: string, maxLength: number, errorMessage: string){
	  	const control = form.controls[controlName];
	  	if(control?.errors && (control.errors['required'] || (control.error['maxlength'] && control.errors['maxlength'].requiredLength > maxLength))){
	  		this.toastr.error(errorMessage, 'Form Error');
	  	}
	  }

}