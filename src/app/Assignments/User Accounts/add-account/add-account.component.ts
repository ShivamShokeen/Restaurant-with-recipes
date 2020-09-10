import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { userAccountsService } from '../user-account.service';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss'],
})
export class AddAccountComponent implements OnInit {

  constructor(private accountService: userAccountsService) { }

  ngOnInit() { }

  addaccount(name, accountNumber) {
    this.accountService.Account(name.value, accountNumber.value);
  }

}
