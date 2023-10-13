import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  private provinces: string[] = [
    "Mashonaland Central",
    "Mashonaland East",
    "Mashonaland West",
    "Manicaland",
    "Midlands",
    "Masvingo",
    "Matabeleland North",
    "Matabeleland South",
    "Harare",
    "Bulawayo"
  ];

  getProvinces(): string[] {
    return this.provinces;
  }
}
