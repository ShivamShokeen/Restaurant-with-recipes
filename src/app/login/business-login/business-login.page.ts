import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { userService } from 'src/app/Typesofroutings/users/users.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { restaurantService } from 'src/app/Restaurant/restaurant.service';

@Component({
  selector: 'app-business-login',
  templateUrl: './business-login.page.html',
  styleUrls: ['./business-login.page.scss'],
})
export class BusinessLoginPage implements OnInit {

  organizationDetails = {
    name: "",
    email: "",
    password: "",
    legalName: "",
    checkedTC: false,
    city: "",
    country: "",
    address: "",
    zipcode: "",
    siteOfOrganization: "",
    phoneVerification: "",
    phoneNumber: "",
    customerCareNumber: "",
    accountType: "business",
    image: "",
    uid: ""
  }
  businessRegistration = true;
  businessName = false;
  businessAddress = false;
  createdUserDetail;
  constructor(public alertController: AlertController, public userservice: userService, private http: HttpClient, public router: Router, private toastController: ToastController,public restaurantservice: restaurantService,) { }

  ngOnInit() {
  }
  Submit(form: NgForm) {
    if (form.valid) {
      let duplicateEmailId: any;
      this.restaurantservice.reload();;
      if (this.userservice.allUserAccountDetails) {
        duplicateEmailId = this.userservice.allUserAccountDetails.filter((value) => form.value.userEmail == value.email);
        if (duplicateEmailId.length == 0) {
          this.businessName = true;
          this.businessRegistration = false;
        }
        else {
          this.duplicateEmail();
        }
      }
    }
    else {
      this.businessName = false;
      this.businessRegistration = true;
    }
  }
  firmName(form) {
    if (form.valid) {
      let duplicateFirmName: any;
      this.restaurantservice.reload();;
      if (this.userservice.allUserAccountDetails) {
        duplicateFirmName = this.userservice.allUserAccountDetails.filter((value) => this.organizationDetails.legalName == value.legalName);
      }
      if (duplicateFirmName.length == 0) {
        this.businessName = false;
        this.businessAddress = true;
      } else {
        this.duplicateName();
        this.businessName = true;
        this.businessAddress = false;
      }
    }
  }
  sellerInformation(form: NgForm) {
    if (form.valid == true) {
      firebase.auth().createUserWithEmailAndPassword(this.organizationDetails.email, this.organizationDetails.password)
        .then(
          (user) => {
            let userLogginDetails = firebase.auth().currentUser;
            if (user) {
              userLogginDetails.updateProfile({
                displayName: this.organizationDetails.name
              });
            }
            this.organizationDetails.uid = userLogginDetails.uid;
            this.http.post('https://restaurant-f5ce2.firebaseio.com/userAccounts.json', this.organizationDetails).subscribe(responseData => {
            });
          }
        )
        .catch(error => {
          console.log(error);
          this.signupErrorMessage(error.message);
        })

      this.signupSuccessMessage();
      this.router.navigate(['/login','SignIn']);
    } else {
      this.emptyFieldAlert();
    }
  }


  async signupErrorMessage(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: "middle",
      color: "danger"
    });
    toast.present();
  }

  async signupSuccessMessage() {
    const toast = await this.toastController.create({
      message: 'Transfering to Signin/Login :)',
      duration: 3000,
      position: 'middle',
      color: "primary"
    });
    toast.present();
  }

  async duplicateName() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: "Name already exist.",
      animated: true,
      buttons: ['OK']
    });

    await alert.present();
  }

  async duplicateEmail() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: "Email id already exist.",
      animated: true,
      buttons: ['OK']
    });

    await alert.present();
  }

  async emptyFieldAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: "Please enter all the detail's before submitting.",
      animated: true,
      buttons: ['OK']
    });

    await alert.present();
  }

  async Workinprogress() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: "Work in Progress.",
      animated: true,
      buttons: ['OK']
    });
    await alert.present();
  }
}
