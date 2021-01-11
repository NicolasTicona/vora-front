import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.pug',
  styleUrls: ['./landing.component.sass']
})
export class LandingComponent implements OnInit {

  userLogged: any = {
    fullname: ''
  };
  isLogged: boolean = false;
  teams: any[] = [];
  teamIdLastCreated: number;

  constructor(
    private authSvc: AuthService,
    private homeSvc: HomeService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    if(this.authSvc.isLogged()){
      this.isLogged = true;
      this.getUserInSession();

      this.teamIdLastCreated = Number(this.route.snapshot.paramMap.get('id'));
    }

    this.getTeams();
  }

  getTeams(){
    this.homeSvc.getTeams().subscribe((res: any) => {
      this.teams = res.response.teams;
      console.log(this.teams);
    }, err => {
      console.log(err);
    })
  }

  getUserInSession(){
    this.userLogged = this.authSvc.getUserInSession();
  }

  onRedirectBySession(){
    if(this.isLogged){
      this.authSvc.closeSession();
    }else{
      this.router.navigate(['/login']);
    }
  }

  getUsers(team){
    return new Array(team.count_users)
  }
  
  onJoinTeam(team){
    let obj = {
      team_id: team.team_id,
      user_id: this.userLogged.user_id
    }

    this.homeSvc.joinTeam(obj).subscribe((res:any) => {
      team.count_users++;
      console.log(res);
      this.updateTeamsOfUser(team.team_id);
      this.snackbar.open(res.response.statusMessage, '', {
        duration: 2000
      })
    }, err => {
      this.snackbar.open(err.error.err, '', {
        duration: 2000
      })
    })
  }

  updateTeamsOfUser(team_id){
    this.userLogged.teams.push(team_id);

    localStorage.setItem('userLogged', JSON.stringify(this.userLogged));
  }

  onRedirectStation(team_id){
    this.router.navigateByUrl(`/workstation/${team_id}`);
  }

  isUserJoined(team_id){
    if(this.userLogged && this.userLogged.teams){
      return this.userLogged.teams.some(t => t == team_id);
    } else{
      return false;
    }
  }

}
