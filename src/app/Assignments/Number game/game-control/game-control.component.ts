import { Component, OnInit,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.scss'],
})
export class GameControlComponent implements OnInit {

  @Output() intervalFired = new EventEmitter<number>();
  startnumber = 0;
  numbers : any;
  
  constructor() { }

  ngOnInit() {}  

  startgame() {
    this.numbers = setInterval(() => {
      this.intervalFired.emit(this.startnumber + 1);
      this.startnumber ++;
    },1000);
  }
  stopgame(){
    clearTimeout(this.numbers);
    //console.log("Total number "+ this.startnumber)
  }

}
