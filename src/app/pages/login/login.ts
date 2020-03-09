import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { UserData } from '../../providers/user-data';
import { UserOptions } from '../../interfaces/user-options';
import{ AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';

interface User {
  email?:string;
  password?:string;
}



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
  providers: [FirebaseAuthentication]
})
export class LoginPage {
  /* hasVerifiedEmail = true;
  sentTimestamp;
  login: UserOptions = { username: '', password: '' };
  submitted = false;

  user:User ={
    email:'test@example.com',
    password:'test123',
  
  }
  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
 
  constructor(
    public userData: UserData,
    public router: Router,
    public afAuth: AngularFireAuth,
  ) { 
     this.afAuth.authState.subscribe(user => {
      if (user)
        this.hasVerifiedEmail = this.afAuth.auth.currentUser.emailVerified;
    });
    
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      location.reload();
    });
  }

  sendVerificationEmail() {
    this.afAuth.auth.currentUser.sendEmailVerification();
    this.sentTimestamp = new Date();
  }

  reload() {
    window.location.reload();
  }

  
  async createAccount(form: NgForm){
    this.submitted = true;
    if (form.valid) {
    await this.afAuth.auth.createUserWithEmailAndPassword(
      this.login.username,
      this.login.password,
    );
    this.afAuth.auth.currentUser.sendEmailVerification();
    this.sentTimestamp = new Date()
    
    this.router.navigateByUrl('/app/tabs/schedule');
  }


  


  console.log('logged In')
  } */

  // firebaseauth(){
  //   this.firebaseAuthentication.createUserWithEmailAndPassword('test@gmail.com', '123')
  // .then((res: any) => console.log(res))
  // .catch((error: any) => console.error(error));

  // }

 /*  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      //this.firebaseauth();
      // this.userData.login(this.login.username);
      // this.router.navigateByUrl('/app/tabs/schedule');
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }

  ionViewDidLoad() { this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container'); }
 */

 /*  signIn(phoneNumber: number){
    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = "+" + phoneNumber;
    this.afAuth.auth.signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then( confirmationResult => { */
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        /* let prompt = this.alertCtrl.create({
        title: 'Enter the Confirmation code',
        inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
        buttons: [
          { text: 'Cancel',
            handler: data => { console.log('Cancel clicked'); }
          },
          { text: 'Send',
            handler: data => {
              confirmationResult.confirm(data.confirmationCode)
              .then(function (result) {
                // User signed in successfully.
                console.log(result.user);
                // ...
              }).catch(function (error) {
                // User couldn't sign in (bad verification code?)
                // ...
              });
            }
          }
        ]
      });
      prompt.present(); */
  /*   })
    .catch(function (error) {
      console.error("SMS not sent", error);
    });
  
  }
   */



  email: string = '';
  password: string = '';
  error: string = '';
  constructor(private fireauth: AngularFireAuth,
    private router: Router,
    private toastController: ToastController,
    public loadingController: LoadingController,
    public alertController: AlertController) {

  }

  async openLoader() {
    const loading = await this.loadingController.create({
      message: 'Please Wait ...',
      duration: 2000
    });
    await loading.present();
  }
  async closeLoading() {
    return await this.loadingController.dismiss();
  }

  login() {
    this.fireauth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(res => {
        if (res.user) {
          console.log(res.user);
          this.router.navigate(['/home']);
        }
      })
      .catch(err => {
        console.log(`login failed ${err}`);
        this.error = err.message;
      });
  }

  async presentToast(message, show_button, position, duration) {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: show_button,
      position: position,
      duration: duration
    });
    toast.present();
  }
  
}
