import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsComponent } from "./typeCardProduct/products";
import { BannerComponent } from "../../banner/banner";

@Component({
    selector: 'app-home',
    templateUrl: './home.html',
    styleUrls: ['./home.css'],
    imports: [ProductsComponent, BannerComponent],
    standalone: true
})
export class HomeComponent implements OnInit {
    private router = inject(Router);
    isAdminHome: boolean = false;

    ngOnInit(): void {
        this.isAdminHome = this.router.url.includes('/admin');
    }
}