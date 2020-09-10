export class userAccountsService {

    account = [
        {
            name: "Dummy",
            accountNumber: "1024-7894-5643-9510",
            accountStatus: "Active"
        }
    ];


    Account(name: string, accountNumber: string) {
        this.account.push({
            name: name,
            accountNumber: accountNumber,
            accountStatus: "Active"
        })
        console.log("User account details " + JSON.stringify(this.account));
    }
    accountStatus(name: string, accountNumber: string, accountStatus: string) {
        this.account.push({
            name: name,
            accountNumber: accountNumber,
            accountStatus: accountStatus
        })
        console.log("User account details(accountStatus) " + JSON.stringify(this.account));
    }

}