import { Component, Input } from "@angular/core";

interface Product {
  name: string;
  imgUrl: string;
}

@Component({
  selector:'app-modelProduct',
  templateUrl: './modelProduct.html',
  styleUrls: ['./modelProduct.css'],
  standalone:true
})
export class modelProductComponent{

  @Input() product!: Product;

}