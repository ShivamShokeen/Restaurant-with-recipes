import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';

import { Platform, MenuController, ModalController, AlertController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { userAccountsService } from './Assignments/User Accounts/user-account.service';
import { LoginPage } from './login/login.page';
import { userService } from './Typesofroutings/users/users.service';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  servers = [
    {
      value: "",
      name: "",
      content: ""
    }
  ];

  account = [
    {
      name: "",
      accountNumber: "",
      accountStatus: ""
    }
  ];

  @Output() evenNumbers: number[] = [];
  @Output() oddNumber: number[] = [];
  @Output() userName: string;
  @Output() userAccountNumber: string[] = [];

  Userinfo: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private accountService: userAccountsService,
    public modalController: ModalController,
    public userservice: userService,
    public alertController: AlertController,
    public router: Router,
    public toastController: ToastController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#3880ff');
    });
    firebase.initializeApp(environment.firebaseConfig);
  }

  ngOnInit() {
    this.account = this.accountService.account;
  }
  onServerAdded(serverCreated: { serverName: string, serverContent: string }) {
    this.servers.push({
      value: "server",
      name: serverCreated.serverName,
      content: serverCreated.serverContent
    })
  }

  onBlueprintAdded(blueprintCreated: { serverName: string, serverContent: string }) {
    this.servers.push({
      value: "blueprint",
      name: blueprintCreated.serverName,
      content: blueprintCreated.serverContent
    })
  }

  Numbers(count: number) {
    if (count > 0 && count % 2 == 0) {
      this.evenNumbers.push(count);
      console.log("Even NUmbers " + JSON.stringify(this.evenNumbers));
    }
    else {
      this.oddNumber.push(count);
    }
  }

  async SignUp() {
    const modal = await this.modalController.create({
      component: LoginPage,
      componentProps: { SignUp: true }
    });
    return await modal.present();
  }

  async login() {
    const modal = await this.modalController.create({
      component: LoginPage,
      componentProps: { login: true }
    });
    return await modal.present();
  }

  userLogout() {
    firebase.auth().signOut().then(() => {
      console.log("Sign-out successful.");
      this.userservice.userId = "";
      this.userservice.userId = "";
      this.logoutMessage();
      this.router.navigate(['/restaurant-home']);
    }).catch((error) => {
      console.log(error);
    });
  }

  async logoutMessage() {
    const toast = await this.toastController.create({
      message: 'You are successfully signout.',
      duration: 7000,
      position: 'bottom',
      color: 'danger'
    });
    toast.present();
  }

  async Workinprogress() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: "Work in Progress(For now if you want to logout just refresh the page).",
      animated: true,
      buttons: ['OK']
    });
    await alert.present();
  }
}
