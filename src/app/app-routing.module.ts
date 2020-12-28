import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
// import { HomeComponent } from './components/home/home.component';
import { WorkstationComponent } from './components/workstation/workstation.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'workstation/:id', component: WorkstationComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/landing', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing:false, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
