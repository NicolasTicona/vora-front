import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'collaborators-images',
  templateUrl: './collaborators-images.component.pug',
  styleUrls: ['./collaborators-images.component.sass']
})
export class CollaboratorsImagesComponent implements OnInit {

  @Input() size: String;
  @Input() items: any[];

  arr = [1,2,3,4];

  constructor() { }

  ngOnInit(): void {
  }

}
