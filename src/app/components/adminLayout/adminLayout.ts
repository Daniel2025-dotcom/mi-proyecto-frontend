import { Component } from "@angular/core";
import { HeaderCompoent } from "./header/header";
import { RouterOutlet } from '@angular/router';

@Component({
    selector:'app-admin',
    standalone:true,
    templateUrl: './adminLayout.html',
    styleUrls: ['./adminLayout.css'],
    imports: [HeaderCompoent, RouterOutlet]
})
export class AdminLayoutComponent{

}