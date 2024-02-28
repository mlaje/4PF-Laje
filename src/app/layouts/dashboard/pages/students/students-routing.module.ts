import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StudentsComponent } from "./students.component";
import { StudentDetailComponent } from "./pages/student-detail/student-detail.component";


//  /dashboard/students
const routes: Routes = [
    {
        path : '',
        component:  StudentsComponent
    },
    {
        path : ':idStudent',
        component:  StudentDetailComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class StudentsRoutingModule {}

