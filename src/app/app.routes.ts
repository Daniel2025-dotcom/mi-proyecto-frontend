import { Routes } from '@angular/router';
import { HomeComponent } from './components/public-layout/routerOutlet/home/home';
import { AdminLayoutComponent } from './components/adminLayout/adminLayout';
import { LoadProductComponent } from './components/adminLayout/routerAdmin/loadProduct/loadProduct';
import { AddCategoryComponent } from './components/adminLayout/routerAdmin/addCategory/addCategory';
import { LoginComponent } from './components/loginTemplate/login';
import { authGuard } from './guard/auth.guard';
import { PublicLayoutComponent } from './components/public-layout/public-layout';
import { ResultFilterComponent } from './components/public-layout/routerOutlet/resultFilter/resultFilter';
import { HomeComponentUser } from './components/public-layout/routerOutlet/home/homeUser';
export const routes: Routes = [

    {
        path: '',component: PublicLayoutComponent,

        children: [
            { path: '', component: HomeComponentUser },
            { path: 'celulares', component: ResultFilterComponent }

        ]
    },
    {
        path:'admin',component: AdminLayoutComponent,canActivateChild:[authGuard],
        children:[
            {path: '',component:HomeComponent},
            {path:'loadProduct',component:LoadProductComponent},
            {path:'addCategory',component:AddCategoryComponent}
        ]

    },
    {
        path:'login',component: LoginComponent
    }
];