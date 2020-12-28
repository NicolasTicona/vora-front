import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './components/shared/shared.module';
import { HomeModule } from './components/home/home.module';


import { AppComponent } from './app.component';
import { WorkstationComponent } from './components/workstation/workstation.component';
import { ActivitybarComponent } from './components/activitybar/activitybar.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { TeamDetailComponent } from './components/team-detail/team-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskComponent } from './components/task/task.component';
import { EditCreateTaskComponent } from './components/modals/edit-create-task/edit-create-task.component';
import { AsignViewCollaboratorsComponent } from './components/modals/asign-view-collaborators/asign-view-collaborators.component';
import { DetailTaskComponent } from './components/modals/detail-task/detail-task.component';
import { LoginComponent } from './components/login/login.component';


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
    AsignViewCollaboratorsComponent,
    DetailTaskComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    SharedModule
  ],
  providers: [],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
