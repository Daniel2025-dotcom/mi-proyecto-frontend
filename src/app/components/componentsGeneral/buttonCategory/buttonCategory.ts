import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService, Category } from '../../../services/hostinger/categoryService';
import { MenuNodesComponent } from './menu-nodes.component';

@Component({
  selector: 'app-button-category',
  templateUrl: './buttonCategory.html',
  styleUrls: ['./buttonCategory.css'],
  standalone: true,
  imports: [CommonModule, MenuNodesComponent]
})
export class ButtonCategoryComponent implements OnInit {
  private categoryService = inject(CategoryService);
  categories: Category[] = [];

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error al cargar categorías');
      }
    });
  }
}