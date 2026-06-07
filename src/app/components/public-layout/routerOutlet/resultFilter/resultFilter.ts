import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardProductDto, ProductService , ProductByCategoryRequestDTO} from '../../../../services/hostinger/productService';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { catchError ,of} from 'rxjs';
import { ProductComponentUser } from '../home/products/productUser';
import { ProductComponent } from '../home/products/product';
@Component({
  selector: 'app-result-filter',
  standalone: true,
  imports: [CommonModule, AsyncPipe, ProductComponentUser, ProductComponent],
  templateUrl: './resultFilter.html',
  styleUrls: ['./resultFilter.css']
})
export class ResultFilterComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router); 
  private productService = inject(ProductService);
  products$!: Observable<CardProductDto[]>;
  isAdmin: boolean = false;

  ngOnInit(): void {
    this.isAdmin = this.router.url.includes('/admin');
    this.route.queryParams.subscribe(params => {
      const categoryId = params['id'];
      const requestId: ProductByCategoryRequestDTO = {
        id: parseInt(categoryId)
      };

      this.products$ = this.productService
        .getProductsByCategory(requestId)
        .pipe(
          catchError(err => {
            console.warn('[ProductsComponent] Servidor offline');
            return of([]);
          })
        );
    });
  }
}