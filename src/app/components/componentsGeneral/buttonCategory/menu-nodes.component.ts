import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../../services/hostinger/categoryService';

@Component({
  selector: 'app-menu-nodes',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./buttonCategory.css'], 
  template: `
    <li *ngFor="let cat of nodes" class="menu-item">
      <div class="item-content">
        <a href="javascript:void(0)">{{ cat.nombre }}</a>
        <span class="sub-arrow" *ngIf="cat.hijos && cat.hijos.length > 0">▶</span>
      </div>

      <ul class="submenu" *ngIf="cat.hijos && cat.hijos.length > 0">
        <app-menu-nodes [nodes]="cat.hijos"></app-menu-nodes>
      </ul>
    </li>
  `
})
export class MenuNodesComponent {
  @Input() nodes: Category[] = [];
}