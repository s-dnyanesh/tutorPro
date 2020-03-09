import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AccountPage } from './account';
import { AccountPageRoutingModule } from './account-routing.module';
import { FormsModule } from '@angular/forms';
import { ImageCropperModule, } from 'ngx-image-cropper';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AccountPageRoutingModule,
    FormsModule,
    ImageCropperModule
  ],
  declarations: [
    AccountPage,
  ]
})
export class AccountModule { }
