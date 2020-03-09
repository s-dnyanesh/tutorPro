import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TutsService,Idea } from '../../providers/tuts.service';
import { ToastController,AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { snapshotToArray ,snapshotToObject} from "../../../environments/environment";


@Component({
  selector: 'doubt-deatil',
  templateUrl: './doubt-deatil.page.html',
  styleUrls: ['./doubt-deatil.page.scss'],
})
export class DoubtDeatilPage implements OnInit {
  items = [];
  id=15;
  ref = firebase.database().ref('ideas').child('/enquiries');
  chargesText :string='';
  genderText :string='';
  placeText :string='';
  descriptionText :string='';
  locaionText :string='';
  nameText :string='';
  standardText :string='';
  boardText :string='';
  mobileText :string=''
  item = {};
  hideMe: boolean;
  constructor(private route: ActivatedRoute,private alertCtrl:AlertController,private toastCtrl:ToastController,
    public router: Router) {
    firebase.database().ref('ideas/enquiries/'+this.route.snapshot.paramMap.get('key')).on('value', resp => {
      this.item = snapshotToObject(resp);
    });
    
  }

  ngOnInit() {
  }
  async contactUser(key) {
    
    let ref = firebase.database().ref(`ideas/enquiries/${key}/tutsApplied`);
    ref.transaction((current) => {
      return (current) + 1;
    }); 
    console.log();
      const toast = await this.toastCtrl.create({
      message: 'We will contact you soon.. ',
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
  async reportClick(){
    const toast = await this.toastCtrl.create({
      message: 'Enquiry is reported for moderation',
      duration: 8000
    });
    await toast.present();
  }
  hide(hideMe){
    this.hideMe=true;
  }
  async toggleFavorite() {
    if (this.toggleFavorite) {
      
      const toast = await this.toastCtrl.create({
        message: 'Removed from Favorites.',
        duration: 3000
      });
      await toast.present();
    } else {
      
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

}
