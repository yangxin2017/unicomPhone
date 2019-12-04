import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { UserStore } from '../user.storage';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the Err500Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-err500',
  templateUrl: 'err500.html',
})
export class Err500Page {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    private storage:Storage,
    private app:App
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Err500Page');
  }

  goMain(){
    this.viewCtrl.dismiss().then(()=>{
      this.navCtrl.setRoot('TabPage');
    });
  }

  logout(){
    this.storage.remove('user');
    this.navCtrl.popToRoot();
    this.viewCtrl.dismiss().then(()=>{
      this.app.getRootNav().setRoot("LoginPage");
    })
    //window.location.href = '/#login';
    //this.navCtrl.setRoot('LoginPage');
  }

}
