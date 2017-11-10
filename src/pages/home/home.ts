import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { File } from '@ionic-native/file';

//import { AppFunctionProvider } from '../../providers/app-function/app-function';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  qrData = null;
  createdCode = null;
  scannedCode = null;
  limiter = 0;
  constructor(
      private barcodeScanner: BarcodeScanner,
      public navCtl: NavController,
      private photoViewer: PhotoViewer,
      private file: File,
      private tos: ToastController
  ) { }

//create qrcode based on input text
//  createCode() {
//    this.createdCode = this.qrData;
//  }

//scan qr code
  scanCode() {
    this.limiter++;
    if(this.limiter>5) {
        let limitn = this.tos.create({
            message: "Scan Limit Reached, Please Activate This Apps",
            duration: 3000,
            position: 'bottom'
        });
        limitn.present();
    } else {
        this.barcodeScanner.scan().then(barcodeData => {
            //regex for scanned QR
            var regScan = new RegExp('^[0-9]+$');
            var regTest = regScan.test(barcodeData.text);
            if (regTest == false) {
                let toaster = this.tos.create({
                    message: "QRCode is Invalid",
                    duration: 3000,
                    position: 'bottom'
                });
                toaster.present();
            }

            //if qr valid then check file in app directory
            this.file.checkFile(this.file.applicationDirectory+"www/assets/media/","hal"+barcodeData.text+".jpg").then(
                (exist) => {
                    console.log(exist);
                    this.onViewImg(barcodeData.text);
                },
                (error) => {
                    let toaster1 = this.tos.create({
                        message: "Resource Not Found",
                        duration: 3000,
                        position: 'bottom'
                    });
                    toaster1.present();
                }
            );
        }, (err) => {
            console.log('Error: ', err);
        });
     }
  }
    
    //navigation
    goTo(id) {
        this.navCtl.push(id);
    }

    //image view and share
    onViewImg(img) {
        const url = "www/assets/media/";
        console.log(this.file.applicationDirectory , img);
        this.photoViewer.show(this.file.applicationDirectory + url + "hal" + img + ".jpg");
    }
}
