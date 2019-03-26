import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { File } from '@ionic-native/file/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage],
  providers: [
    BarcodeScanner,
    File,
    Base64,
    PhotoViewer
  ]
})
export class HomePageModule {}