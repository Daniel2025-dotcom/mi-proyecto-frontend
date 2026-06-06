import { Component, Input } from '@angular/core';

export interface CardProductDto {
  id: number;
  url: string;
  name: string;
  price: number;
}

@Component({
  selector: 'app-productUser',
  standalone: true,
  templateUrl: './productUser.html',
  styleUrls: ['./productUser.css']
})
export class ProductComponentUser {

  @Input({ required: true }) dateProducts!: CardProductDto; 

  onConsult() {
    console.log("aun falta implementar la funcionalidad");
 }
}