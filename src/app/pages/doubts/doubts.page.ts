import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import {IonSlides } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { TutsService,Idea } from '../../providers/tuts.service';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import { snapshotToArray } from "../../../environments/environment";


@Component({
  selector: 'doubts',
  templateUrl: './doubts.page.html',
  styleUrls: ['./doubts.page.scss'],
})
export class DoubtsPage  {
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
  mobileText :string='';
  urgencyText: any;
  modeText: any;
  currDate:any;
  
  idea: Idea = {
    name: '',
    notes: ''
  };
  @ViewChild('slides', { static: true }) slider: IonSlides; 
  slideOptions = {
    initialSlide: 1,
    speed: 1000,
    autoplay:true,
  };
  topStories = [
    {title: "Exploring San Francisco", author: "Rea Ramsey", body: "", picture: "https://picsum.photos/500/400?image=693"},
    {title: "Coffee the right way", author: "Ellesha Hartley", body: "", picture: "https://picsum.photos/500/400?image=1060"},
    {title: "Best Hiking In Yosemite", author: "Vinnie Alexander", body: "", picture: "https://picsum.photos/500/400?image=1043"},
    {title: "Astro Photography Guide", author: "Greg Rakozy", body: "", picture: "https://picsum.photos/500/400?image=903"}
  ];
  AskDoubts = [
    {title: "Name"},
    {title: "Standard"},
    {title: "MobileNumber"},
  ];
  


  constructor(public router: Router,private activatedRoute: ActivatedRoute, private tutService: TutsService,
    private toastCtrl: ToastController) {
      this.ref.on('value', resp => {
        this.items = [];
        this.items = snapshotToArray(resp);
      });
     }
addItem(item) {
    
    item['Charges'] = this.chargesText;
    item['GenderPreference'] = this.genderText;
    item['place'] = this.placeText;
    item['description'] = this.descriptionText;
    item['location'] = this.locaionText;
    item['name'] = this.nameText;
    item['standard'] = this.standardText;
    item['board'] = this.boardText;
    item['mobilenumber'] = this.mobileText;
    item['track'] = this.urgencyText;
    item['mode'] = this.modeText;
    item['timeDate'] = this.currDate=new Date().toISOString();
    

    
  console.log(item,' data added successfully!');
  if(item!==undefined &&item!== null){
      let newItem = this.ref.push(); 
      newItem.set(item) ;
        
      
      }
    }
deleteIdea(){
  console.log(this.currDate=new Date().toISOString());
}


  askDoubts(){
    window.open('https://myprivateguruoficial.000webhostapp.com/qa/index.php');
  }
  clickNext(){
    console.log('Next is clicked');
  }
  next() {
    console.log('Next is clicked');
    this.slider.slideNext();
  }

  prev() {
    console.log('Prev is clicked');
    this.slider.slidePrev();
  }
  addIdea() {
    this.tutService.addIdea(this.idea).then(() => {
      this.router.navigateByUrl('/');
      this.showToast('Info Posted');
    }, err => {
      this.showToast('There was a problem adding your idea :(');
    });
  }
  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
  
  

}
