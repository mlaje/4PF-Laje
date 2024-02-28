import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "../../dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";


//  /auth
const routes: Routes = [
    {
        // /auth/login
        path : 'login',
        component:  LoginComponent
    },
   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthRoutingModule  {}

