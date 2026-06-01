import { Component, Input } from '@angular/core';

export interface CardProductDto {
  id: number;
  url: string;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.html',
  styleUrls: ['./product.css']
})
export class ProductComponent {

  @Input({ required: true }) dateProducts!: CardProductDto; 

  onModify() {
    alert("aun falta implementar la funcionalidad");
  }

  onDelete() {
    alert("aun falta implementar la funcionalidad");
  }
}