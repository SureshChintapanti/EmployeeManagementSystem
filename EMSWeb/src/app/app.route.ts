import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { AddemployeeComponent } from './components/addemployee/addemployee.component';
import { AdddepartmentComponent } from './components/adddepartment/adddepartment.component';

export const routes: Routes = [
    {path: 'welcome', component:WelcomeComponent},
    {path: 'login', component:LoginComponent},
    {path: 'new-user', component: RegisterComponent},
    {path: 'admin', component: RegisterComponent},
    {path: 'forget-password', component: ForgetPasswordComponent},
    {path: 'dashboard', component:DashboardComponent},
    {path: 'settings', component: SettingsComponent},
    {path: 'departments', component:DepartmentsComponent},
    {path: 'add-department', component: AdddepartmentComponent},
    {path: 'add-employee', component:AddemployeeComponent},
    {path: 'update-employee', component: AddemployeeComponent},
    {path: 'employees', component:EmployeesComponent},
    {path: '', redirectTo: 'welcome', pathMatch: 'full'},
    {path: '**', component: NotfoundComponent}
];
