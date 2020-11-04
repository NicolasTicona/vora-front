import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UsersService } from 'src/app/services/users.service';
import { AsignViewCollaboratorsComponent } from '../asign-view-collaborators/asign-view-collaborators.component';
import { SELECTION_STATES } from '../../../models/assignment-collaborators.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'modal-edit-create-task',
  templateUrl: './edit-create-task.component.pug',
  styleUrls: ['./edit-create-task.component.sass']
})
export class EditCreateTaskComponent implements OnInit {

  form: FormGroup;
  showProgress: boolean = false;
  updateTaskAfterClosed: any = {};
  
  
  collaboratorsSaved: any[] = []; // vienen por bd
  collaboratorsAssigned: any[] = []; // se asignan solo en la vista
  collaboratorsView: any[] = []; // merge de ambos arrays

  collaboratorsInTeam: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private dashboardSvc: DashboardService,
    private usersSvc: UsersService,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<EditCreateTaskComponent>) { }

  ngOnInit(): void {
    this.getCollaboratorsInTeam();

    this.initForm();
  }

  getCollaboratorsInTeam(){
    this.usersSvc.getUsersInTeam({team_id: 4}).subscribe((res: any) => {
      this.collaboratorsInTeam = [...res.response.users];
    },err => {
      console.log(err)
    })
  }

 
  initForm(){
    this.form = new FormGroup({
      name: new FormControl(this.data.name, Validators.required),
      description: new FormControl(this.data.description, Validators.required),
      finish_at: new FormControl(this.data.finish_at, Validators.required)
    })

    if(this.data.state == 'ACTUALIZAR' && Array.isArray(this.data.collaborators)){
      this.collaboratorsSaved = this.data.collaborators;
      this.collaboratorsView = [...this.collaboratorsSaved];
    }
  }

  asignCollaborators(){
    let dialogRef2 = this.dialog.open(AsignViewCollaboratorsComponent,{
      data:{
        collaboratorsAssigned: [...this.collaboratorsView],
        collaborators: this.collaboratorsInTeam,
        task_id: this.data.task_id,
        state: this.data.state
      },
      disableClose: true,
      width: '350px'
    })

    dialogRef2.afterClosed().subscribe(res => {

      if(!res) return;
      
      switch(res.state){
        case 1: 
          this.collaboratorsAssigned = [...this.collaboratorsAssigned, ...res.collaboratorsSelected];
          this.refreshCollaboratorsView();
          break;

       case 2:
         this.updateTaskAfterClosed = res;
         this.updateTaskAfterClosed.task_id = this.data.task_id;
         this.updateTaskAfterClosed.count_users = this.collaboratorsView.length;
      }
    })

    dialogRef2.componentInstance.removeCollaborator.subscribe(user => {
      if(user.state == SELECTION_STATES.WAS_SABED){
        this.collaboratorsSaved = this.collaboratorsSaved
          .filter(colab => colab.user_id != user.user_id);
      }else{
        this.collaboratorsAssigned = this.collaboratorsAssigned
          .filter(colab => colab.user_id != user.user_id);
      }

      this.refreshCollaboratorsView();
    })
  }

  refreshCollaboratorsView(){
    this.collaboratorsView = [...this.collaboratorsSaved,...this.collaboratorsAssigned];
  }

  saveForm(){
    this.showProgress = true;

    let taskObj = {
      ...this.form.value,
      task_id: this.data.task_id,
      collaborators: this.collaboratorsAssigned
    }

    if(this.data.state == 'ACTUALIZAR'){
      this.dashboardSvc.editTask(taskObj).subscribe((res: any) => {
        this.showProgress = false;
  
        taskObj.count_users = this.collaboratorsView.length;

        this.dashboardSvc.$updateTask.next({
          state: 1,
          task_updated: taskObj
        });

        this.dialogRef.close();

        this.snackbar.open(res.response.statusMessage, '', {
          duration: 2000
        })

      }, err => {
        console.log('error', err)
        this.showProgress = false;
      })
    }else{
      this.dashboardSvc.createTask(taskObj).subscribe((res: any) => {
        this.showProgress = false;

        taskObj.task_id = res.response.taskID;
        taskObj.count_users = this.collaboratorsAssigned.length;
        
        this.dialogRef.close(taskObj);

        this.snackbar.open(res.response.statusMessage, '', {
          duration: 2000
        })
      }, err => {
        console.log('error', err)
        this.showProgress = false;
      })

    }

  }

  updateTaskWhenRemoving(){
    this.dashboardSvc.$updateTask.next(this.updateTaskAfterClosed);
  }

  closeModal(){
    console.log(this.updateTaskAfterClosed);
    if(this.updateTaskAfterClosed?.update) this.updateTaskWhenRemoving()
    this.dialogRef.close();
  }

  get _description(){
    return this.form.controls['description'];
  }
}