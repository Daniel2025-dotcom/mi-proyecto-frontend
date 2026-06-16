import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environment/environment.prod';
import { CardProductDto } from '../../../../../services/hostinger/productService';
export interface TemplateEmail{
    nameProduct: string;
    pathCategory: string;    
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

  buissnesEmail = environment.email
  TemplateEmail(): void {
  const subject = `Consulta sobre: ${this.dateProducts.name}`;
  const body = `Hola, me interesa obtener más información sobre el producto ${this.dateProducts.name} (ID: ${this.dateProducts.id}) de la categoría: ${this.dateProducts.pathCategory}...`; 
  const subjectEscaped = encodeURIComponent(subject);
  const bodyEscaped = encodeURIComponent(body);
  const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${this.buissnesEmail}&su=${subjectEscaped}&body=${bodyEscaped}`;
  window.open(gmailUrl, '_blank');
  }

}