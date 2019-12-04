import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the RealchartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-realchart',
  templateUrl: 'realchart.html',
})
export class RealchartPage {

  @ViewChild('realchart')
  greetDiv: any;

  showTip:boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  ionViewDidLeave(){
    this.greetDiv.disConnect();
  }
  ionViewDidEnter(){
    this.greetDiv.connect();
  }

}
