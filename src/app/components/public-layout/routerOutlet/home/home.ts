import { Component } from "@angular/core";
import { BannerComponent } from "./banner/banner";
import { ProductsComponent } from "./products/products";

@Component({
    selector: "app-home",
    templateUrl: "./home.html",
    imports: [BannerComponent, ProductsComponent],
    styleUrls: ["./home.css"],
    standalone: true
})
export class HomeComponent {
    
}