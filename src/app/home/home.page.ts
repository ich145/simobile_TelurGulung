import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  totalProduk: number = 10;
  totalTransaksi: number = 250000;
  produkTerlaris: string = 'Minyak Goreng 500 Ml';

  constructor() {}

}
