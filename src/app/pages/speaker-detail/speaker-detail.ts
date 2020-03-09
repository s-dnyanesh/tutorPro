import { Component, ViewEncapsulation,ViewChild,NO_ERRORS_SCHEMA ,NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConferenceData } from '../../providers/conference-data';
import {IonSlides } from '@ionic/angular';  
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'page-speaker-detail',
  templateUrl: 'speaker-detail.html',
  styleUrls: ['./speaker-detail.scss'],
})
export class SpeakerDetailPage {
  speaker: any;
  @ViewChild('slides', { static: true }) slider: IonSlides;  
  segment = 0;  

  constructor(
    private dataProvider: ConferenceData,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      const speakerId = this.route.snapshot.paramMap.get('speakerId');
      if (data && data.speakers) {
        for (const speaker of data.speakers) {
          if (speaker && speaker.id === speakerId) {
            this.speaker = speaker;
            break;
          }
        }
      }
    });
  }
 
 
 
  async segmentChanged(ev:any) {  
    console.log(ev.detail.value);
    this.segment=ev.detail.value;
    
    await this.slider.slideTo(this.segment);
    console.log('this segment is clicked',ev);
      
    
  }  
  async slideChanged() {  
    this.segment = await this.slider.getActiveIndex(); 
    console.log(this.segment) 
  }  
}
