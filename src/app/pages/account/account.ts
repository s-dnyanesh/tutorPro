import { AfterViewInit, Component, ViewEncapsulation ,ViewChild,ElementRef, NgZone} from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { UserData } from '../../providers/user-data';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FormsModule } from '@angular/forms';
import { ImageCroppedEvent,ImageCropperComponent } from 'ngx-image-cropper';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { storage }  from 'firebase';

import { File } from "@ionic-native/file/ngx";
declare var google: any;

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss'],
})
export class AccountPage {
  myImage = null;
  croppedImage = null;
  imageChangedEvent: any = '';
  camera: any ='';
  @ViewChild(ImageCropperComponent, { static: false }) angularCropper: ImageCropperComponent;
/* export class AccountPage implements AfterViewInit {

  @ViewChild('Map', {static: false}) mapElement: ElementRef;
    map: any;
    mapOptions: any;
    location = {lat: null, lng: null};
    markerOptions: any = {position: null, map: null, title: null};
    marker: any;
    apiKey: any = 'AIzaSyCx3eEuscBl9ftG-sUlUGqdnYqcp0btOHc'; 
  username: string;
  
  

  constructor(
    public alertCtrl: AlertController,
    public router: Router,
    public userData: UserData,
    public zone: NgZone,
    public geolocation: Geolocation,
    
  )  {
    
      const script = document.createElement('script');
      script.id = 'googleMap';
      if (this.apiKey) {
          script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey;
      } else {
          script.src = 'https://maps.googleapis.com/maps/api/js?key=';
      }
      document.head.appendChild(script);
      
      this.geolocation.getCurrentPosition().then((position) =>  {
          this.location.lat = position.coords.latitude;
          this.location.lng = position.coords.longitude;
      });
      
      this.mapOptions = {
          center: this.location,
          zoom: 21,
          mapTypeControl: false
      };
      setTimeout(() => {
          this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
        
          this.markerOptions.position = this.location;
          this.markerOptions.map = this.map;
          this.markerOptions.title = 'My Location';
          this.marker = new google.maps.Marker(this.markerOptions);
      }, 3000);
      console.log(this.mapOptions);
  }
  locate(){
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log("lat" + resp.coords.latitude + "- long" + resp.coords.longitude)
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

 

  ngAfterViewInit() {
    this.getUsername();
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  
  async changeUsername() {
    const alert = await this.alertCtrl.create({
      header: 'Change Username',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            this.userData.setUsername(data.username);
            this.getUsername();
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'username',
          value: this.username,
          placeholder: 'username'
        }
      ]
    });
    await alert.present();
  }

  getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
    });
  }

  changePassword() {
    console.log('Clicked to change password');
  }

  logout() {
    this.userData.logout();
    this.router.navigateByUrl('/login');
  }

  support() {
    this.router.navigateByUrl('/support');
  }
   */

  user: any;
  email: string = '';
  password: string = '';
  username: string = '';
  image: number;
  phone: number;
  error: string;
  userWantsToSignup: boolean = false;
  linkError: string = '';

  constructor( private toastController: ToastController, public loadingController: LoadingController, private fireauth: AngularFireAuth, private router: Router) { }


  ionViewDidEnter() {
    this.fireauth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        console.log(this.user);
      }
    })
  }

  updateEmail() {
    this.user.updateEmail(this.email)
      .then(() => {
        this.email = '';
        this.presentToast('Email updated', false, 'bottom', 1000);
        this.error = '';
      })
      .catch(err => {
        console.log(` failed ${err}`);
        this.error = err.message;
      });
  }

  updateUsername() {
    this.user.updateProfile({
      displayName: this.username
    })
      .then((data) => {
        console.log(data);
        this.username = '';
        this.presentToast('Username updated', false, 'bottom', 1000);
        this.error = '';
      })
      .catch(err => {
        console.log(` failed ${err}`);
        this.error = err.message;
      });
  }

  updateImage() {

    this.user.updateProfile({
      photoURL: `https://picsum.photos/id/${this.image}/200/200`
    })
      .then((data) => {
        console.log(data);
        this.image = null;
        this.presentToast('Image updated', false, 'bottom', 1000);
        this.error = '';
      })
      .catch(err => {
        console.log(` failed ${err}`);
        this.error = err.message;
      });
  }

  updatePassword() {
    this.user.updatePassword(this.password)
      .then(() => {
        this.password = '';
        this.presentToast('Password updated', false, 'bottom', 1000);
        this.error = '';
      })
      .catch(err => {
        console.log(` failed ${err}`);
        this.error = err.message;
      });
  }

  logout() {
    this.fireauth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
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

 
  async captureImage() {
    /* this.convertFileToDataURLviaFileReader(`assets/firebase.png`).subscribe(base64 => {
      // this.convertFileToDataURLviaFileReader(`http://localhost:4200/home/assets/Ramen.gif`).subscribe(base64 => {
      this.myImage = base64;
    }
    ); */
try{
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.camera.getPicture(options).then((imageData) => {
      this.myImage = 'data:image/jpeg;base64,', +ImageData;
    });

    const result = await this.camera.getPicture(options);
    const image = 'data:image/jpeg;base64,${result}';
    const pictures =storage().ref('pictures');
    pictures.putString(image,'data_url')
  }
  catch(e){
    console.error(e);
  }

  }

  // function to convert to base64 file
  convertFileToDataURLviaFileReader(url: string) {
    return Observable.create(observer => {
      let xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onload = function () {
        let reader: FileReader = new FileReader();
        reader.onloadend = function () {
          observer.next(reader.result);
          observer.complete();
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    });
  }

  
 

  move(x, y) {
    this.angularCropper.cropper.x1 += x;
    this.angularCropper.cropper.x2 += x;
    this.angularCropper.cropper.y1 += y;
    this.angularCropper.cropper.y2 += y;
  }

 
    
    
    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        console.log(' Image is cropped');
        return this.croppedImage;
    }
    imageLoaded() {
        
    }
    cropperReady() {
        // cropper ready
    }
    loadImageFailed() {
        // show message
    }
    /*  uploadFile(file){
      const fileName = 'my' + '.png';
      const fileRef = firebase.storage().ref().child('tptimagefolder/'+ fileName);
      const uploadTask = fileRef.put(file);
      
      return new Promise((resolve, reject) => {
          uploadTask.on('state_changed', snapshot => {
      },  error => {
            reject(error);
      
      }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('teste resolve url'+downloadURL);
      
          resolve ( {fileName, downloadURL});
        });
      
      });
      
      }); }
 

 */

encodeImageUri(imageUri, callback) {
  var c = document.createElement('canvas');
  var ctx = c.getContext("2d");
  var img = new Image();
  img.onload = function () {
    var aux:any = this;
    c.width = aux.width;
    c.height = aux.height;
    ctx.drawImage(img, 0, 0);
    var dataURL = c.toDataURL("image/jpeg");
    callback(dataURL);
  };
  img.src = imageUri;
};
uploadImage(imageURI, randomId){
  let storageRef = firebase.storage().ref();
let imageRef = storageRef.child('image').child('imageName');
  return new Promise<any>((resolve, reject) => {
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child('image').child(randomId);
    this.encodeImageUri(imageURI, function(image64){
      imageRef.putString(image64, 'data_url')
      .then(snapshot => {
        snapshot.ref.getDownloadURL()
        .then(res => resolve(res))
      }, err => {
        reject(err);
      })
    })
  })
}

  }
