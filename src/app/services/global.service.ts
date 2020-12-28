import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  $toggleSidebar = new BehaviorSubject(null);
  $obs_toggleSidebar = this.$toggleSidebar.asObservable();
  
  constructor() { }
}
  