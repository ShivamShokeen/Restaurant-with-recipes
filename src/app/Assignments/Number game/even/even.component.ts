import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-even',
  templateUrl: './even.component.html',
  styleUrls: ['./even.component.scss'],
})
export class EvenComponent implements OnInit {

  @Input() EvenNumber:number [] = [];

  constructor() { }

  ngOnInit() {}


}
