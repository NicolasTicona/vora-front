import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LandingComponent } from './landing/landing.component';
import { TeamCreationComponent } from './team-creation/team-creation.component';
import { SharedModule } from 'src/app/components/shared/shared.module';


@NgModule({
  declarations: [
    LandingComponent,
    TeamCreationComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
