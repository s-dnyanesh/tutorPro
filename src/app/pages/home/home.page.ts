import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TutsService,Idea } from '../../providers/tuts.service';
import { ToastController,AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { snapshotToArray } from "../../../environments/environment";


@Component({
  selector: 'home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
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


  constructor(public router: Router,private activatedRoute: ActivatedRoute, private tutService: TutsService,
    private toastCtrl: ToastController,private alertController:AlertController) {
      this.ref.on('value', resp => {
        this.items = [];
        this.items = snapshotToArray(resp);
      });
     }

  ngOnInit() {
  }
  edit(key) {
    this.router.navigate(['/edit/'+key]);
  }
  async delete(key) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure want to delete this info?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('cancel');
          }
        }, {
          text: 'Okay',
          handler: () => {
            firebase.database().ref('infos/'+key).remove();
          }
        }
      ]
    });
  
    await alert.present();
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
