import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponentUser } from './headerUser/headerUser';

@Component({
    selector: 'app-public-layout',
    standalone: true,
    imports: [RouterOutlet,HeaderComponentUser],
    templateUrl: './public-layout.html',
    styleUrls: ['./public-layout.css']
})
export class PublicLayoutComponent {

}