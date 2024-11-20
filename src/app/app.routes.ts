import { Routes } from '@angular/router';
import {ContentComponent} from './content/content.component'
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guard/auth.guard';
import { ContentdetailsComponent } from './components/contentdetails/contentdetails.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {path:'login' , component:LoginComponent},
    {path:'register' , component:RegisterComponent},
    // {path:'content' , component:ContentComponent}
    {path:'content' , component:ContentComponent , canActivate:[AuthGuard]},
    {path:'detail' , component:ContentdetailsComponent , canActivate:[AuthGuard]}
];
