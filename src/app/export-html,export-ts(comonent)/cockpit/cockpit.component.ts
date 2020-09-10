import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.scss'],
})
export class CockpitComponent implements OnInit {  
  @Output() serverCreated = new EventEmitter<{serverName : string , serverContent : string}> ();
  @Output() blueprintCreated = new EventEmitter<{serverName : string , serverContent : string}> ();
  
  constructor() { }
  ngOnInit() {}
    
  addserver(serverNameInput,serverContentInput) {
    this.serverCreated.emit({serverName : serverNameInput.value , serverContent : serverContentInput.value});
   }
   addserverblueprint(serverNameInput,serverContentInput) {
    this.blueprintCreated.emit({serverName :  serverNameInput.value, serverContent : serverContentInput.value});
   }

}
