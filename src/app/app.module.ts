import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module'; 
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WorkstationComponent } from './components/workstation/workstation.component';
import { ActivitybarComponent } from './components/activitybar/activitybar.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { TeamDetailComponent } from './components/team-detail/team-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskComponent } from './components/task/task.component';
import { EditCreateTaskComponent } from './components/modals/edit-create-task/edit-create-task.component';
import { CollaboratorsImagesComponent } from './components/shared/collaborators-images/collaborators-images.component';
import { AsignViewCollaboratorsComponent } from './components/modals/asign-view-collaborators/asign-view-collaborators.component';
import { DashboardService } from './services/dashboard.service';
import { UsersService } from './services/users.service';
import { DetailTaskComponent } from './components/modals/detail-task/detail-task.component';


@NgModule({
  declarations: [
    AppComponent,
    WorkstationComponent,
    ActivitybarComponent,
    WorkspaceComponent,
    TeamDetailComponent,
    DashboardComponent,
    TaskComponent,
    EditCreateTaskComponent,
    CollaboratorsImagesComponent,
    AsignViewCollaboratorsComponent,
    DetailTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule, 
    FormsModule,
    HttpClientModule
  ],
  providers: [DashboardService, UsersService],
  entryComponents: [EditCreateTaskComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
