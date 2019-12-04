import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ScandetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scandetail',
  templateUrl: 'scandetail.html',
})
export class ScandetailPage {

  equip:any = null;
  data:any = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.equip = this.navParams.get('equip');
    this.data = this.navParams.get('data');
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ScandetailPage');
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

}
