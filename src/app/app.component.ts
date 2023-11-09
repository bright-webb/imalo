import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  template: `
    ...
    <ngx-loading-bar></ngx-loading-bar>
  `,
})
export class AppComponent{
  title = 'imalo';
  constructor(private router: Router, private spinner: NgxSpinnerService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.showSpinner();
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.hideSpinner();
      }
    });
  }

  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }

}
