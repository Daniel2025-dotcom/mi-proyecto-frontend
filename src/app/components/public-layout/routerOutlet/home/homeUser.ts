import { Component } from "@angular/core";
import { BannerComponent } from "./banner/banner";
import { ProductsComponentUser } from "./products/productsUser";

@Component({
    selector: "app-homeUser",
    templateUrl: "./homeUser.html",
    imports: [BannerComponent, ProductsComponentUser],
    styleUrls: ["./homeUser.css"],
    standalone: true
})
export class HomeComponentUser {
    
}