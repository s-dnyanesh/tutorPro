import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from '../../providers/user-data';
import { UserOptions } from '../../interfaces/user-options';
import { Platform, AlertController } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  /* signup: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    public router: Router,
    public userData: UserData
  ) {}

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.signup(this.signup.username);
      this.router.navigateByUrl('/app/tabs/schedule');
    }
  }
  onLogin() {
    this.router.navigateByUrl('/login');
  } */
  email: string = '';
  password: string = '';
  error: string = '';
  username: string = '';
  image: number;
  constructor(private fireauth: AngularFireAuth, private router: Router, private toastController: ToastController, private platform: Platform, public loadingController: LoadingController,
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

  signup() {
    this.fireauth.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then(res => {
        if (res.user) {
          console.log(res.user);
          this.updateProfile();
        }
      })
      .catch(err => {
        console.log(`login failed ${err}`);
        this.error = err.message;
      });
  }

  updateProfile() {
    this.fireauth.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        user.updateProfile({
          displayName: this.username,
          photoURL: `https://picsum.photos/id/${this.image}/200/200`
        })
          .then(() => {
            this.router.navigateByUrl('/home');
          })
      }
    })
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
