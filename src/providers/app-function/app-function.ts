import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController } from 'ionic-angular';
/*
  Generated class for the AppFunctionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppFunctionProvider {

  constructor(public http: Http, public navCtrl: NavController) {
    console.log('Hello AppFunctionProvider Provider');
  }
  goTo(id: string) {
      this.navCtrl.push(id);
  }
}
