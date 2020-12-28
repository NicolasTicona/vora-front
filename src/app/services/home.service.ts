import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  
  URL: string = 'http://localhost:3000/api/home';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    }),
    params: {}
  };

  constructor(private http: HttpClient) { }

  getTeams(){
    return this.http.get(`${this.URL}/getTeams`);
  }

  createTeam(data){
    return this.http.post(`${this.URL}/createTeam`, data, this.httpOptions);
  }

  joinTeam(data){
    return this.http.post(`${this.URL}/joinTeam`, data, this.httpOptions);
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
