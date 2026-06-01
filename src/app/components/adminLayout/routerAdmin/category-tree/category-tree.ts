import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../../../services/hostinger/categoryService';

@Component({
  selector: 'app-category-tree',
  standalone: true,
  imports: [CategoryTreeComponent],
  templateUrl: './category-tree.html',
  styleUrls: ['./category-tree.css']
})
export class CategoryTreeComponent {
  @Input() categories: Category[] = [];  
  @Output() categorySelected = new EventEmitter<{ nombre: string, idSeleccionado: number }>();
  expanded: Set<number> = new Set();

  toggle(id: number) {
    if (this.expanded.has(id)) {
      this.expanded.delete(id);
    } else {
      this.expanded.add(id);
    }
  }

  isExpanded(id: number): boolean {
    return this.expanded.has(id);
  }

  selectCategory(nombre: string, idSeleccionado: number) {
    this.categorySelected.emit({ nombre, idSeleccionado });
  }
}