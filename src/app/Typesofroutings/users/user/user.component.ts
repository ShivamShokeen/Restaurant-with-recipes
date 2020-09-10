import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {

  user : {id: number, name : string};

  parameterSubscription : Subscription;
  
  constructor(private router :Router,
    private route : ActivatedRoute ) { }

  ngOnInit()  {
    this.user = {
      id : this.route.snapshot.params['id'],
      name:this.route.snapshot.params['name']
    }

    // this.parameterSubscription =  this.route.params.subscribe((params : Params) =>{
    //   this.user.id = params['id'];
    //   this.user.name = params['name']
    // })
  }

  ngOnDestroy(){
    this.parameterSubscription.unsubscribe();
  }


}
