import { Component, inject,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent} from '../products/product'; 
import { ProductService } from '../../../../../services/hostinger/productService';
import { CardProductDto } from '../../../../../services/hostinger/productService';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductComponent, AsyncPipe],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})

export class ProductsComponent implements OnInit {

  private productService = inject(ProductService);
  products$!: Observable<CardProductDto[]>;

ngOnInit(): void {
  this.products$ = this.productService.getProducts().pipe(
    catchError(err => {
        console.warn('[ProductsComponent] Servidor offline');
  return of([]);
    })
  )
}


}