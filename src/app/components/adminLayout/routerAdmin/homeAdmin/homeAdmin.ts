import { Component } from "@angular/core";
import { modelProductComponent } from "./modelProduct/modelProduct";
interface Product {
    id:number;
  name: string;
  imgUrl: string;
}

@Component({
    selector:'app-homeAdmin',
     templateUrl: './homeAdmin.html',
    styleUrls: ['./homeAdmin.css'],
    imports:[modelProductComponent],
    standalone:true
})

export class homeAdminComponent{
    listProduct: Product[] = [];

}