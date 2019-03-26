import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { File } from '@ionic-native/file/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router,
    private barcodescan: BarcodeScanner, private file: File,
    private base64: Base64, private toaster: Toast,
    private photoviewer: PhotoViewer) { }

  scanme() {
    this.barcodescan.scan().then(barcodeData => {
      this.file.checkFile(this.file.applicationDirectory + "www/assets/shareme/", barcodeData.text + ".jpg").then(
        (exist) => {
          this.openImg(barcodeData.text);
        },
        (error) => {
          console.error(error);
          this.toaster.show(error, "5000", "bottom").subscribe(
            toast => {
              this.onToast("file check: " + error);
            });
        }
      );
    }).catch(err => {
      this.onToast("scanning error: " + err);
    });
    
  }

  openImg(filename: string) {

    let urlpath = this.file.applicationDirectory + "www/assets/shareme/" + filename + ".jpg";
    this.photoviewer.show(urlpath, "Quotes Halaman " + filename, {share: true});
  }

  onToast(message: string) {
    this.toaster.show(message, "5000", "bottom").subscribe(
      toast => {
        console.log(toast);
      });
  }
}
