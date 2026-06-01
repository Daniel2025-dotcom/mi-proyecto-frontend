import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchComponent } from "./search/search";
import { LoginComponent } from "./login/login";

@Component({
    selector: 'app-infonav',
    templateUrl: './infoNav.html',
    styleUrls: ['./infoNav.css'],
    imports: [CommonModule, SearchComponent, LoginComponent],
    standalone: true
})
export class InfoNavComponent{
     showLogin = false;

    toggleLogin(){
        this.showLogin = !this.showLogin;
    }


}