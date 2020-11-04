import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';
import { SELECTION_STATES } from '../../../models/assignment-collaborators.model';

@Component({
  selector: 'asign-view-collaborators',
  templateUrl: './asign-view-collaborators.component.pug',
  styleUrls: ['./asign-view-collaborators.component.sass']
})
export class AsignViewCollaboratorsComponent implements OnInit {

  @Output() removeCollaborator = new EventEmitter();

  showProgress: boolean = false;
  collaboratorsSelected: any[] = [];
  emitUpdateWhenRemoving: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AsignViewCollaboratorsComponent>,
    private userSrv: UsersService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.setCollaboratorsSelection();
  }

  setCollaboratorsSelection(){
    this.data.collaborators.map(colab => {
      colab.disabled = false;
      if(this.data.collaboratorsAssigned.some(c => c.user_id == colab.user_id)){
        colab.disabled = true;
      }
    })
  }

  asignCollaborator(){

    this.dialogRef.close({
      state: 1,
      collaboratorsSelected: [...this.collaboratorsSelected]
    });
  }

  selectCollaborator(colab){

    if(this.isInSelected(colab)){
      this.collaboratorsSelected = this.collaboratorsSelected.filter(collaborator => 
        collaborator.user_id != colab.user_id);
    }
    else if(!colab.disabled){
      colab.state = SELECTION_STATES.IS_ASSIGNED;
      this.collaboratorsSelected.push(colab);
    }
  }

  deleteFromTask(colabDeleted){

    if(colabDeleted.state == SELECTION_STATES.IS_ASSIGNED){
      this.data.collaboratorsAssigned = this.data.collaboratorsAssigned
        .filter(colab => colab.user_id != colabDeleted.user_id);
        
        this.removeCollaborator.emit(colabDeleted);

        this.setCollaboratorsSelection();

      this.snackbar.open('Se retiró con éxito', '', {
        duration: 2000
      })
    }

    else if(this.data.state == 'ACTUALIZAR' && colabDeleted.state != SELECTION_STATES.IS_ASSIGNED){

      let obj = {
        task_id: this.data.task_id,
        user_id: colabDeleted.user_id
      }
        
      this.showProgress = true;
      this.emitUpdateWhenRemoving = true;

      this.userSrv.removeUserFromTask(obj).subscribe((res: any) => {
  
        this.showProgress = false;
        this.data.collaboratorsAssigned = this.data.collaboratorsAssigned
          .filter(colab => colab.user_id != colabDeleted.user_id);
        
        colabDeleted.state = SELECTION_STATES.WAS_SABED;
        this.removeCollaborator.emit(colabDeleted);

        this.setCollaboratorsSelection();
  
        this.snackbar.open(res.response.message, '', {
          duration: 2000
        })
  
      }, err => {
        this.showProgress = false;
        console.log(err)
      })
    }
  }

  isInSelected(colab){
    return this.collaboratorsSelected.includes(colab);
  }

  closeModal(){

    if(this.emitUpdateWhenRemoving){
      this.dialogRef.close({
        state: 2,
        update: true
      });
    }else{
      this.dialogRef.close();
    }
  }


}
