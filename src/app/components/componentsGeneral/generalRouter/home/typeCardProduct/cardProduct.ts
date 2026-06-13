import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CardProductDto {
  id: number;
  url: string;
  name: string;
  price: number;
}
@Component({
  selector: 'app-cardProduct',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cardProduct.html',
  styleUrls: ['./cardProduct.css']
})
export class CardProductComponent {
  @Input({ required: true }) dateProducts!: CardProductDto; 
  @Input() isAdmin: boolean = false;
  @Output() modify = new EventEmitter<CardProductDto>();
  @Output() delete = new EventEmitter<CardProductDto>();
  @Output() consult = new EventEmitter<CardProductDto>();

  onModify(): void {
    this.modify.emit(this.dateProducts);
  }

  onDelete(): void {
    this.delete.emit(this.dateProducts);
  }

  onConsult(): void {
    this.consult.emit(this.dateProducts);
  }
}