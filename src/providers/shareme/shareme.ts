import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { ToastController, Platform } from 'ionic-angular';
//import { BehaviorSubject } from 'rxjs/Rx';
//import { Observable } from "rxjs/Observable"; //for observavle 
/*
  Generated class for the SharemeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SharemeProvider {
  act_code: string;
  //public activated: BehaviorSubject<boolean>;

  constructor(public http: Http, 
              public storage: Storage,
              public toast: ToastController,
              public platform: Platform) 
  {
      this.act_code = "1708";
      //this.activated = new BehaviorSubject(false);
      this.platform.ready().then(()=>{
          this.getKeyVal('appstatus').then(data=>{
              if (data == undefined || data == null) {
                  this.setKeyVal('appstatus',false);
              }
          })
      })
  }
  //get storage key value
  getKeyVal(key){
      return this.storage.get(key);
  }
//  getActived() {
//      return this.activated.asObservable();
//  }
  //set storage key value
  setKeyVal(key,val) {
      return this.storage.set(key,val);
  }
  //remove storage key value
  rmKey(key) {
      return this.storage.remove(key);
  }
  //toast for android
  onToast(msg) {
        let tos = this.toast.create({
            message: msg,
            duration: 2000,
            position: 'middle'
        });
        tos.present();
    }
}
