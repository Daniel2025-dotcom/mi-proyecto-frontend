import { Component, inject,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../../services/hostinger/productService';
import { CardProductDto } from '../../../../../services/hostinger/productService';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { AsyncPipe } from '@angular/common';
import { ProductComponentUser } from './productUser';
@Component({
  selector: 'app-productsUser',
  standalone: true,
  imports: [CommonModule, ProductComponentUser, AsyncPipe],
  templateUrl: './productsUser.html',
  styleUrls: ['./productsUser.css']
})

export class ProductsComponentUser implements OnInit {

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