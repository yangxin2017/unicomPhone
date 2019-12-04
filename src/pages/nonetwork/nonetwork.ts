import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Network } from '@ionic-native/network';

/**
 * Generated class for the NonetworkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nonetwork',
  templateUrl: 'nonetwork.html',
})
export class NonetworkPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl:ViewController, private network: Network) {
  }

  ionViewDidLoad() {
    /*this.network.onConnect().subscribe(() => {

      alert('network connected!');
      
      setTimeout(() => {
        alert(this.network.type);
        if (this.network.type === 'wifi') {
          alert('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });*/
  }

  closeModal(){
    this.viewCtrl.dismiss(null);
  }

  refreshpage(){
    console.log('123');
  }

}
