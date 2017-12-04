import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import { SharemeProvider } from './../../providers/shareme/shareme';
/**
 * Generated class for the ActivationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activation',
  templateUrl: 'activation.html',
})
export class ActivationPage {
    kode: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private sharef: SharemeProvider,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivationPage');
  }
    nextTime() {
        this.navCtrl.push('HomePage',{values: true});
    }
    validate() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present(); //loading for smooth transition
        if (this.kode == null) {
            loading.dismiss();
            this.sharef.onToast("Kode Buku Tidak Boleh Kosong");
        } else if (this.kode != this.sharef.act_code) {
            setTimeout(() => {
                loading.dismiss();
                this.sharef.onToast("Kode Buku Salah");
            }, 5000);
            this.kode="";
        }
        if (this.kode == this.sharef.act_code) {
            this.sharef.rmKey('limiter'); //remove value of limiter key
            this.sharef.setKeyVal('appstatus',true); //set status to true (active)
            //this.sharef.activated.next(true);
            setTimeout(() => {
                loading.dismiss();
                this.sharef.onToast("Aplikasi Berhasil Aktif");
                this.navCtrl.push('HomePage');
            }, 5000);
        }
    }

}
