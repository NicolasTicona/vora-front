import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'format-finish-date',
  templateUrl: './format-finish-date.component.pug',
  styleUrls: ['./format-finish-date.component.sass']
})
export class FormatFinishDateComponent implements OnInit {

  @Input() date: Date;

  constructor() { }

  ngOnInit(): void {
  }
}
