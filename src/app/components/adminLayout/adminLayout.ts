import { Component } from "@angular/core";
import { HeaderCompoent } from "./header/header";
import { RouterOutlet } from '@angular/router';
import { BannerComponent } from "../public-layout/routerOutlet/home/banner/banner";

@Component({
    selector:'app-admin',
    standalone:true,
    templateUrl: './adminLayout.html',
    styleUrls: ['./adminLayout.css'],
    imports: [HeaderCompoent, RouterOutlet]
})
export class AdminLayoutComponent{

}