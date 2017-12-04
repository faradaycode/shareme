import { Component } from '@angular/core';
import { Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { SharemeProvider } from '../providers/shareme/shareme';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = '';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage, 
              public app: App, private sharef: SharemeProvider, private orin: ScreenOrientation) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.storage.ready().then(() => {
          this.sharef.getKeyVal('appstatus').then(data=>{
              if(data) {
                  this.rootPage = 'HomePage';
              } else {
                  this.rootPage = 'ActivationPage';
              }
          });
          statusBar.styleDefault();
          splashScreen.hide();
          this.orin.lock(this.orin.ORIENTATIONS.PORTRAIT); //lock rotating screen
      });
    platform.registerBackButtonAction(()=>{
          let nav = app.getActiveNavs()[0];
          let activeView = nav.getActive();
          if(activeView.name === "HomePage" || activeView.name === "ActivationPage" ) {
              platform.exitApp();
          }
        
      });
    });
  }
}

