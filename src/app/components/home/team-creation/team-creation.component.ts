import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { verify } from 'crypto';
import { AuthService } from 'src/app/services/auth.service';
import { HomeService } from 'src/app/services/home.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'team-creation',
  templateUrl: './team-creation.component.pug',
  styleUrls: ['./team-creation.component.sass']
})
export class TeamCreationComponent implements OnInit {

  showSpinner: Boolean = false;
  userLogged: any;
  setOrientation: String = 'horizontal';
  teamName: FormControl;
  filterInput: FormControl;
  collaborators: any[] = [];
  collaboratorsFiltered: any[] = [];
  collaboratorsSelected: any[] = [];

  constructor(
    private userSvc: UsersService,
    private homeSvc: HomeService,
    private authSvc: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userLogged = this.authSvc.getUserInSession();
    this.collaboratorsSelected.push(this.userLogged.user_id);


    this.teamName = new FormControl('', Validators.required);
    this.filterInput = new FormControl();

    if(window.innerWidth <= 768){
      this.setOrientation = 'vertical';
    }

    this.getCollaborators();
    this.onFilterCollaborators();
  }

  getCollaborators(){
    this.userSvc.getCollaborators().subscribe((res:any) => {
      this.collaborators = res.response.collaborators;
      this.collaboratorsFiltered = [...this.collaborators];
      console.log(this.collaborators)
    }, err => {
      console.log(err);
    })
  }

  onFilterCollaborators(){
    this.filterInput.valueChanges.subscribe(res => {
      this.collaboratorsFiltered = this.collaborators.filter(c => c.fullname.includes(res))
    })
  }

  onSelectionCollaborators(e){
    if(e.option._selected){
      this.collaboratorsSelected.push(e.option._value);
    }else{
      this.collaboratorsSelected = this.collaboratorsSelected.filter(c => c != e.option._value);
    }
  }

  onConfirmCreation(){

    this.showSpinner = true;
    let teamObj = {
      name: this.teamName.value,
      collaborators: this.collaboratorsSelected,
      creator_id: this.userLogged.user_id
    }

    console.log(teamObj);

    this.homeSvc.createTeam(teamObj).subscribe((res: any) => {
      this.showSpinner = false;

      this.verifyTeam(res.response.teamID);

      setTimeout(() => {
        this.router.navigateByUrl(`/landing/${res.response.teamID}`)
      }, 2000)
    }, err => {
      console.log(err);
      this.showSpinner = false;
    })
  }

  verifyTeam(team_id){
    if(this.collaboratorsSelected.some(c => c == this.userLogged.user_id)){
      this.userLogged.teams.push(team_id);

      this.authSvc.saveCredentialsOnStorage(this.userLogged);
    }
  }

  isSelected(id){
    return this.collaboratorsSelected.includes(id) || this.isCreator(id);
  }

  isCreator(id){
    return this.userLogged.user_id === id;
  }
}
