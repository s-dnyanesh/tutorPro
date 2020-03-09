import { Component } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';
import { ActivatedRoute } from '@angular/router';
import { UserData } from '../../providers/user-data';
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'page-session-detail',
  styleUrls: ['./session-detail.scss'],
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  session: any;
  isFavorite = false;
  defaultHref = '';

  constructor(
    private dataProvider: ConferenceData,
    private userProvider: UserData,
    private route: ActivatedRoute,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      if (data && data.schedule && data.schedule[0] && data.schedule[0].groups) {
        const sessionId = this.route.snapshot.paramMap.get('sessionId');
        for (const group of data.schedule[0].groups) {
          if (group && group.sessions) {
            for (const session of group.sessions) {
              if (session && session.id === sessionId) {
                this.session = session;

                this.isFavorite = this.userProvider.hasFavorite(
                  this.session.name
                );

                break;
              }
            }
          }
        }
      }
    });
  }

  ionViewDidEnter() {
    this.defaultHref = `/app/tabs/schedule`;
  }

  sessionClick(item: string) {
    console.log('Clicked', item);
  }

  async toggleFavorite() {
    if (this.userProvider.hasFavorite(this.session.name)) {
      this.userProvider.removeFavorite(this.session.name);
      this.isFavorite = false;
      const toast = await this.toastCtrl.create({
        message: 'Removed from Favorites.',
        duration: 3000
      });
      await toast.present();
    } else {
      this.userProvider.addFavorite(this.session.name);
      this.isFavorite = true;
      const toast = await this.toastCtrl.create({
        message: 'Added to your Favourites.',
        duration: 3000
      });
      await toast.present();
    }
  }

  async shareSession() {
    const toast = await this.toastCtrl.create({
      message: 'This will share your Enquiry.',
      duration: 3000
    });
    await toast.present();
    
     
    console.log('Clicked share session');
  }
  async contactUser() {
    console.log(this.session.id);
    console.log(this.session.mobilenumber);
    const toast = await this.toastCtrl.create({
      message: 'Mobile number for '+ this.session.id +' is '+ this.session.mobilenumber,
      duration: 8000
    });
    await toast.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Hurye!  <strong>New Version of the app is available in Playstore . Install Now</strong>!!!',
      buttons: [
        {
          text: 'Later',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Update Now',
          handler: () => {
            window.open('https://play.google.com/store/apps/details?id=com.myprivateguru.mobile');
          }
        }
      ]
    });

    await alert.present();
  }
  

}
