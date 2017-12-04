import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { File } from '@ionic-native/file';
import { SharemeProvider } from '../../providers/shareme/shareme';
import { AppRate } from '@ionic-native/app-rate';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  counter: number = 0;
  constructor(
      private barcodeScanner: BarcodeScanner,
      public navCtl: NavController,
      private photoViewer: PhotoViewer,
      private file: File,
      private platform: Platform,
      private sharef: SharemeProvider,
      private parama: NavParams,
      private alert: AlertController,
      private rating: AppRate
  ) {
      this.platform.ready().then(()=> {
          //rating plugin
          this.rating.preferences = {
                openStoreInApp: false,
                displayAppName: 'Doa Harian Muslim',
                usesUntilPrompt: 2,
                promptAgainForEachNewVersion: false,
                storeAppURL: {
                  android: 'market://details?id=com.magentamedia.shareme'
                },
                customLocale: {
                  title: 'Do you enjoy %@?',
                  message: 'If you enjoy using %@, would you mind taking a moment to rate it? Thanks so much!',
                  cancelButtonLabel: 'No, Thanks',
                  laterButtonLabel: 'Remind Me Later',
                  rateButtonLabel: 'Rate It Now'
                },
                callbacks: {
                  onRateDialogShow: function(callback){
                    console.log('rate dialog shown!');
                  },
                  onButtonClicked: function(buttonIndex){
                    console.log('Selected index: -> ' + buttonIndex);
                  }
                }
            };
            this.rating.promptForRating(false);
             let param = this.parama.get('values');
             if(param) {
                 let alert = this.alert.create({
                     title: 'Informasi',
                     subTitle: 'Aplikasi Ini Belum di Aktivasi, Anda Tidak Akan Bisa Share Gambar Setelah 5 Kali Scan',
                     buttons: ['OK']
                 });
                 alert.present();
             }
             this.sharef.getKeyVal('appstatus').then(sta => {
                 if(!sta) {
                     this.sharef.getKeyVal('limiter').then(res => {
                         if(res > 0) {
                             this.counter = res;
                         }
                     });
                 }
             });
        
        });  
  }

//scan qr code
  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
        //if qr valid then check file in app directory
        this.file.checkFile(this.file.applicationDirectory+"www/assets/media/","hal"+barcodeData.text+".jpg").then(
            (exist) => {
                console.log(exist);
                this.sharef.getKeyVal('appstatus').then(res=>{
                    if(!res) {
                        this.counter++;
                        this.sharef.setKeyVal('limiter',this.counter);
                    }
                });
                this.onViewImg(barcodeData.text);
            },
            (error) => {
                console.error(error);
                this.sharef.onToast("Invalid QRCode");
            }
        );
    }, (err) => {
        console.log('Error: ', err);
    });
  }
    
    //navigation
    goTo(id) {
        this.navCtl.push(id);
    }
    //image view and share
    onViewImg(img) {
        const url = "www/assets/media/";
        this.sharef.getKeyVal('limiter').then(
            result => {
                if(result >= 5) {
                    this.photoViewer.show(this.file.applicationDirectory + url + "hal" + img + ".jpg",'', {share: false});
                } else {
                    this.photoViewer.show(this.file.applicationDirectory + url + "hal" + img + ".jpg",'', {share: true});
                }
            }
        );
    }
}
