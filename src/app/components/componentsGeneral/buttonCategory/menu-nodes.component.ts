import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // <--- Importante para routerLink
import { Category } from '../../../services/hostinger/categoryService';

@Component({
  selector: 'app-menu-nodes',
  standalone: true,
  imports: [CommonModule, RouterModule], // <--- Agregado aquí
  styleUrls: ['./buttonCategory.css'], 
  template: `
    <li *ngFor="let cat of nodes" class="menu-item">
      <div class="item-content">
        <a [routerLink]="['/productos', limpiarUrl(cat.nombre)]">
          {{ cat.nombre }}
        </a>
        <span class="material-symbols-outlined" *ngIf="cat.hijos && cat.hijos.length > 0">arrow_right</span>
      </div>

      <ul class="submenu" *ngIf="cat.hijos && cat.hijos.length > 0">
        <app-menu-nodes [nodes]="cat.hijos"></app-menu-nodes>
      </ul>
    </li>
  `
})
export class MenuNodesComponent {
  @Input() nodes: Category[] = [];

  limpiarUrl(nombre: string): string {
    return nombre
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") 
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, '-'); 
  }
}