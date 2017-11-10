import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
//import { SocialSharing } from '@ionic-native/social-sharing';
//import { Camera, CameraOptions } from '@ionic-native/camera';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { File } from '@ionic-native/file';

/**
 * Generated class for the ScannerP, age page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scanner',
  templateUrl: 'scanner.html',
})
export class ScannerPage {
  public imgUrl: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private photoViewer: PhotoViewer,
              private file: File
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScannerPage');
  }

  shareme() {
//      var options = {
//        message: '', // not supported on some apps (Facebook, Instagram)
//        subject: '', // fi. for email
//        files: 'assets/shareimg/unsplash1.jpg', // a string or array of filenames either locally or remotely
//        url: 'www.facebook.com',
//        chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
//      }
//      this.sosmed.share("Test",null,'./assets/shareimg/unsplash1.jpg',null).then(()=> {
//          console.log("Success Send");
//      }).catch(()=> {
//          console.error("shareSheetShare: failed");
//      });
//    let alert = this.alertCtrl.create({
//        title: 'Alert',
//        subTitle: this.navParams.get('imageName'),
//        buttons: ['Dismiss']
//    });
//    alert.present();
      this.photoViewer.show('https://picsum.photos/200/300?image=0');
  }

 onViewImg(img, title) {
    console.log(this.file.applicationDirectory , img);
    this.photoViewer.show(this.file.applicationDirectory + img);
  }
}
