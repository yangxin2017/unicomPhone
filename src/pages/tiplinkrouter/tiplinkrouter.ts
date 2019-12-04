import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the TiplinkrouterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 declare var cordova:any;

@IonicPage()
@Component({
  selector: 'page-tiplinkrouter',
  templateUrl: 'tiplinkrouter.html',
})
export class TiplinkrouterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
   
  }

  linkedClk(){ 
    this.viewCtrl.dismiss({cancle: false});
  }

  closeModal(){
    this.viewCtrl.dismiss({cancle: true});
  }

  connectWIFI(){
    cordova.plugins.settings.open(["wifi", true], function() {}, function() {}); 
  }

}
