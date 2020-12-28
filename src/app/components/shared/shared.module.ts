import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardService } from '../../services/dashboard.service';
import { UsersService } from '../../services/users.service';
import { GlobalService } from '../../services/global.service';
import { EditCreateTaskComponent } from '../modals/edit-create-task/edit-create-task.component';
import { CollaboratorsImagesComponent } from './collaborators-images/collaborators-images.component';
import { FormatFinishDateComponent } from './format-finish-date/format-finish-date.component'


@NgModule({
  declarations: [
    CollaboratorsImagesComponent,
    FormatFinishDateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, 
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, 
    FormsModule,
    HttpClientModule,
    MaterialModule,
    //Componentes
    FormatFinishDateComponent,
    CollaboratorsImagesComponent
  ],
  providers: [
    DashboardService, UsersService, GlobalService
  ],
  entryComponents: [EditCreateTaskComponent ]
})
export class SharedModule { }
