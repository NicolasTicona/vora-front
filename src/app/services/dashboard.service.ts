import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  $collaborators  = new BehaviorSubject([]);
  $obs_collaborators = this.$collaborators.asObservable();

  $teamInfo = new BehaviorSubject([]);
  $obs_teamInfo = this.$teamInfo.asObservable();

  $updateTask = new Subject();
  $obj_updateTask = this.$updateTask.asObservable();
  
  URL: string = 'http://localhost:3000/api/dashboard'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    }),
    params: {}
  };

  constructor(private http: HttpClient) {}

  getDashboardInfo(data){
    let params = new HttpParams();
    params = params.set('team_id', JSON.stringify(data.team_id))

    return this.http.get(`${this.URL}/getDashboardInfo`, this.getHeaders(params));
  }

  createTask(data){
    return this.http.post(`${this.URL}/createTask`, data, this.httpOptions);
  }

  editTask(data){
    return this.http.post(`${this.URL}/updateTask`, data, this.httpOptions);
  }

  getHeaders(params){
    return  {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      }),
      params
    };
  }

}
