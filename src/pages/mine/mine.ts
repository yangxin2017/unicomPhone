import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ModalController } from 'ionic-angular';

import { UserStore } from '../user.storage';
import { Storage } from '@ionic/storage';
import { MainProvider } from '../../providers/main/main';

/**
 * Generated class for the MinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
  providers: [MainProvider]
})
export class MinePage {

  userinfo:UserStore = null;

  editMod:boolean = false;

  kdjf:string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage: Storage, private app: App,
    private modalCtrl:ModalController,
    private serv:MainProvider
  ) {
    this.serv.getLinkJson().then((res:any)=>{
      this.kdjf = res.kdjf;
    });
  }

  ionViewDidLoad() {
    this.storage.get('user').then((us:UserStore)=>{
      this.userinfo = us;
    });
  }

  logout(){
    this.storage.remove('user');
    this.storage.remove('datas');
    this.navCtrl.popToRoot();
    //window.location.href = '/#login';
    //this.navCtrl.setRoot('LoginPage');
    this.app.getRootNav().setRoot("LoginPage");
  }

  editInfor(){
    this.editMod = true;
  }

  saveInfo(){
    this.storage.set('user', this.userinfo);
    this.editMod = false;
    this.serv.updateUser(this.userinfo);
  }

  goWeb(title){
    const modal = this.modalCtrl.create('AboutusPage', {title: title, url: this.kdjf});
    
    //const modal = this.modalCtrl.create('NonetworkPage', {title: title, url: this.kdjf});
    modal.present();
  }

  showlists(){
    this.navCtrl.push('RoutersPage');
  }

  showlistsNW(){
    const modal = this.modalCtrl.create('BindrouterPage');
    modal.present();
    modal.onDidDismiss((data:any)=>{
      if(data){
        let apmac = data.apmac;
        this.storage.get('user').then((us:UserStore)=>{
          us.apmac = apmac;//apmac;
          us.ip = '--';
          this.storage.set('user', us);

          window.location.reload();

        });
      }
      
    });
  }

}
