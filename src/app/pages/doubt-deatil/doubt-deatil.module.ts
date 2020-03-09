import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoubtDeatilPageRoutingModule } from './doubt-deatil-routing.module';

import { DoubtDeatilPage } from './doubt-deatil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoubtDeatilPageRoutingModule
  ],
  declarations: [DoubtDeatilPage]
})
export class DoubtDeatilPageModule {}
