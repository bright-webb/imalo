import { Component } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  pageTitle: string = "";
  constructor(private pageTitleService: PageTitleService){}
  ngOnInit(){
    this.pageTitle = this.pageTitleService.getPageTitle();
  }
}
