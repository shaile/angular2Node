import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { EmployeeComponent } from '../employee/employee.component';
import { CreateComponent } from './create/create.component';
import { FormsModule} from '@angular/forms';
import { LoginComponent } from '../login/login.component';

const appRoutes: Routes = [
      {path: 'users', component: EmployeeComponent},
      {path : 'create', component:CreateComponent},
      {path : 'login', component:LoginComponent},
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(appRoutes,{useHash:false})],
  declarations: [
    EmployeeComponent,
    CreateComponent,
    LoginComponent
  ],
  exports:[RouterModule]
})

export class AppRoutingModule { }
