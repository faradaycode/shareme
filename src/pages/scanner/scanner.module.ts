import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScannerPage } from './scanner';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    ScannerPage,
  ],
  imports: [
    IonicImageViewerModule,
    IonicPageModule.forChild(ScannerPage),
  ],
})
export class ScannerPageModule {}
