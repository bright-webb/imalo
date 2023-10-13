import { Component } from '@angular/core';
import { ProvinceService } from '../../services/province.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  provinces: string[] = [];
  selectedProvince: string = '';

  constructor(private provinceService: ProvinceService){
    this.provinces = this.provinceService.getProvinces();
  }
}
