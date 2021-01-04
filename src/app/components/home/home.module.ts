import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LandingComponent } from './landing/landing.component';
import { TeamCreationComponent } from './team-creation/team-creation.component';
import { StepperContainer } from './team-creation/stepper-container.component'
import { SharedModule } from 'src/app/components/shared/shared.module';


@NgModule({
  declarations: [
    LandingComponent,
    TeamCreationComponent,
    StepperContainer
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
