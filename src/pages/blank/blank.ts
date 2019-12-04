import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';

/**
 * Generated class for the BlankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-blank',
  templateUrl: 'blank.html',
})
export class BlankPage {

  title:string = '';
  realurl:any = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,private sanitizer: DomSanitizer) {
    let t = this.navParams.get('title');
    let url = this.sanitizer.bypassSecurityTrustResourceUrl(navParams.get('url'));
    if(t){
      this.title = t;
      this.realurl = url;
    }
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    /**
     * 
      cordova.InAppBrowser.open("http://112.124.0.4:8090/haweb/cucczj/index.html#/main", "_self");
     */
  }

}
