import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { userAccountsService } from '../user-account.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss'],
})
export class EditAccountComponent implements OnInit {

  @Input() userAccount: { name: string, accountNumber: string, accountStatus: string };
  @Output() userAccountStatus = new EventEmitter<{ name: string, accountNumber: string, accountStatus: string }>();

  constructor(private accountService: userAccountsService) { }

  ngOnInit() { }

  serverStatusActive() {
    this.accountService.accountStatus(this.userAccount.name, this.userAccount.accountNumber, "Active");
  }

  serverStatusUnknown() {
    this.accountService.accountStatus(this.userAccount.name, this.userAccount.accountNumber, "Unknown");
  }

  serverStatusInactive() {
    this.accountService.accountStatus(this.userAccount.name, this.userAccount.accountNumber, "Inactive");
  }
}
