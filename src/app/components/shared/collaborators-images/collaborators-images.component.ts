import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'collaborators-images',
  templateUrl: './collaborators-images.component.pug',
  styleUrls: ['./collaborators-images.component.sass']
})
export class CollaboratorsImagesComponent implements OnInit {

  @Input() size: String;
  @Input() items: any[];
  @Input() justName: String;

  constructor() { }

  ngOnInit(): void {
  }

}
