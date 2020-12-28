import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { TeamCreationComponent } from './team-creation/team-creation.component';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {path: 'landing/:id', component: LandingComponent},
  {path: 'landing', component: LandingComponent},
  {path: 'teamcreation', component: TeamCreationComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
