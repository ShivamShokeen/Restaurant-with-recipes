import { Component, OnInit } from '@angular/core';
import { userService } from '../Typesofroutings/users/users.service';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';
import { restaurantService } from '../Restaurant/restaurant.service';

interface AuthResonseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  SignUp: any;
  login: any;

  userDetails = {
    name: "",
    country: "",
    city: "",
    email: "",
    password: "",
    address: "",
  };

  organizationDetails = {
    organizationName: "",
    country: "",
    city: "",
    postalCode: 0,
    displayName: "",
    organizationUrl: "",
    email: "",
    password: "",
    address: "",
  } // go to todo list

  showRegistrationForm = false;

  error = null;

  clearErrorMessage = true;

  constructor(public userservice: userService, private modal: ModalController, public alertController: AlertController, private route: ActivatedRoute, private http: HttpClient, private router: Router, private toastController: ToastController,public restaurantservice: restaurantService,) {
  }

  ngOnInit() {
    this.SignUp = (this.route.snapshot.params['for']);
    this.restaurantservice.reload();;
  }

  onSignUp(Form: NgForm) {
    if (Form.valid) {
      let userDetail;
      userDetail = {
        name: this.userDetails.name,
        country: this.userDetails.country,
        city: this.userDetails.city,
        address: this.userDetails.address,
        user_UID: "",
        usertype: "user"
      };
      firebase.auth().createUserWithEmailAndPassword(this.userDetails.email, this.userDetails.password).then(user => {
        if (user) {
          user.user.updateProfile({
            displayName: this.userDetails.name
          }).then(() => {
            let user = firebase.auth().currentUser;
            if (user != null) {
              userDetail.user_UID = user.uid;
              this.http.post('https://restaurant-f5ce2.firebaseio.com/userAccounts.json', userDetail).subscribe(responseData => {
                this.userservice.userId = user.uid;
                this.userservice.userName = user.displayName;
                this.SignUp = "SignIn"
              }, error => {
                this.error = error.message;
                console.log(error);
              });
            }
          }).catch(error => {
            console.log(error)
          });
        }
      }).catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        this.EmailerrorMessage(errorMessage)
      });
    }
  }
  verifySigninUser(user) {
    this.restaurantservice.reload();;
    let userVerify;
    let businessUserVerify;
    if (user) {
      userVerify = this.userservice.userDetails.filter((value) => user.uid == value.user_UID && value.usertype == "user");
      businessUserVerify = this.userservice.businessUserDetails.filter((value) => value.user_UID == user.uid.toString() && value.usertype == "seller");
      userVerify.forEach((value) => {
        this.userservice.userId = value.id;
        this.userservice.userName = user.displayName;
      });
      businessUserVerify.forEach((value) => {
        this.userservice.userId = value.id;
        this.userservice.userId = value.id;
        this.userservice.userName = user.displayName;
      });
    }
    if (this.userservice.userId != null || this.userservice.userId != undefined && this.userservice.userName != null || this.userservice.userName != undefined) {
      this.router.navigate(['/restaurant-home']);
    }
  }

  userLogin(emailId, password) {
    if (emailId.value != undefined || emailId.value != "" && password.value != undefined || password.value != "") {
      this.WaitMessage();
      firebase.auth().signInWithEmailAndPassword(emailId.value, password.value).then((user) => {
        let userLogginDetails = firebase.auth().currentUser;
        this.userservice.UID = userLogginDetails.uid;
        let reference: any;
        let duplicateData = [];
        let filterCondition: any;
        reference = firebase.database().ref('/userAccounts').on("value", (snapshot) => {
          let index: string;
          for (index in snapshot.val()) {
            if (snapshot.val().hasOwnProperty(index)) {
              filterCondition = { ...snapshot.val()[index], id: index };
              if (filterCondition.legalName) {
              duplicateData.push(filterCondition);
              let removeDup: any;
              removeDup = duplicateData.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
              this.userservice.allUserAccountDetails = removeDup;
              this.userservice.getLogginUserDetails();
              this.router.navigate(['/restaurant-home']);
              }
            }
          }
        });

      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        this.EmailerrorMessage(errorMessage)
      });
    }
    else {
      this.emptyFieldAlert();
    }
  }

  async EmailerrorMessage(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 7000,
      position: 'middle',
      color: 'danger'
    });
    toast.present();
  }

  async WaitMessage() {
    const toast = await this.toastController.create({
      message: 'Please wait for few second :)',
      duration: 2210,
      position: 'middle',
      color: 'primary'
    });
    toast.present();
  }

  async emailVerificationMessage() {
    const toast = await this.toastController.create({
      message: 'Verification link has been send but after been verified you still need to Signin :)',
      duration: 5000,
      position: 'middle',
      color: 'primary'
    });
    toast.present();
  }


  onDismiss() {
    this.modal.dismiss();
  }

  resetErrorMessage() {
    this.clearErrorMessage = false;
  }

  async forgotPass() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: "Work in Progress.",
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
