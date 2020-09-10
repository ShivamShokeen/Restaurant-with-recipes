import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss'],
})
export class ServerComponent implements OnInit {

  servers = [
    {
      id: 1,
      serverName: "Production server",
      status: "Offline"
    },
    {
      id: 2,
      serverName: "Testing server",
      status: "Offline"
    },
    {
      id: 3,
      serverName: "Develpoment server",
      status: "Online"
    },
    {
      id: 4,
      serverName: "Additional server",
      status: "Online"
    }
  ]


  checkingServerId: any;

  elementsIndex: any;

  serversCopy = {
    id: 0,
    serverName: '',
    status: ""
  };

  onServerClick: any[] = [];

  constructor(public toastController: ToastController) { }

  ngOnInit() { }

  servername(serverid) {
    this.onServerClick = this.servers.filter((value) => value.id == serverid);
  }

  statusUpdate(serverId, serverStatus) {
    this.elementsIndex = this.servers.findIndex((value) => value.id == serverId);
    let newArray;
    newArray = [...this.servers];
    let checkCurrentStatus;
    checkCurrentStatus = newArray[this.elementsIndex].status == serverStatus.value;
    if (checkCurrentStatus == false) {
      this.serversCopy = newArray[this.elementsIndex] = { ...newArray[this.elementsIndex], status: serverStatus.value }
      console.log("Status update " + JSON.stringify(this.serversCopy))
    }
    else {
      this.presentToast();
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Status is same as previous one',
      duration: 5000,
      position: 'middle',
      color: 'danger'
    });
    toast.present();
  }

}
