import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  URL: string = 'http://localhost:3000/api/users'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    }),
    params: {}
  };

  constructor(private http: HttpClient) {}

  getUsersInTeam(data){
    let params = new HttpParams();
    params = params.set('team_id', JSON.stringify(data.team_id))

    return this.http.get(`${this.URL}/getUsersInTeam`, this.getHeaders(params));
  }

  getUsersInTask(task_id){
    let params = new HttpParams();
    params = params.set('task_id', task_id)

    return this.http.get(`${this.URL}/getUsersInTask`, this.getHeaders(params));
  }

  removeUserFromTask(data){
    return this.http.post(`${this.URL}/removeUserFromTask`, data);
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
