import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, LoadingController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserStore } from '../user.storage';

/**
 * Generated class for the RoutersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-routers',
  templateUrl: 'routers.html',
})
export class RoutersPage {

  routes:any = [];
  isChangeMac:boolean = false;
  changeNewMac:string = '';
  changeNewIp:string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl:ModalController,
    private storage: Storage, private viewCtrl:ViewController, public loadingCtrl: LoadingController,private app: App) {
      this.initRouter();
  }

  initRouter(){
    this.routes = [];
    this.storage.get('user').then((us:UserStore)=>{
      for(let it of us.arrEquips){
        if(it.apmac == us.apmac){
          it.checked = true;
        }else{
          it.checked = false;
        }
        this.routes.push(it);
      }
    });
  }

  ionViewDidLoad() {
  }

  selected(mac){

    let item = null;

    console.log(mac);

    this.storage.get('user').then((us:UserStore)=>{
      if(mac == us.apmac){
        this.isChangeMac = false;
        console.log(this.isChangeMac, 'nnnnnnnnnnnnnnnnn');
      }else{
        for(let it of us.arrEquips){
          if(it.apmac == mac){
            item = it;
          }
        }
  
        //us.apmac = item.apmac;
        //us.ip = item.ip;
  
        //this.storage.set('user', us);

        this.isChangeMac = true;
        this.changeNewMac = item.apmac;
        this.changeNewIp = item.ip;

        console.log(this.isChangeMac, 'yyyyyyyyyyyyyyyyyy');

      }

    });
  }

  addRouter(){
    const modal = this.modalCtrl.create('BindrouterPage');
    modal.present();
    modal.onDidDismiss((data:any)=>{
      if(data && data.apmac){
        let mac = data.apmac;
        this.routes.push({
          alias: mac,
          apmac: mac,
          checked: false,
          ip: '--'
        });
        //this.selected(mac);
      }
      
      //this.initRouter();
      //TODO
      //if(res && res.close){
        /*this.viewCtrl.dismiss();
        setTimeout(()=>{
          window.location.reload();
        }, 50);
        */
      //}
      
    })
  }

  closeModal(){
    this.navCtrl.pop().then(()=>{

      if(this.isChangeMac){
        let loader = this.loadingCtrl.create({
          content: "切换路由中...",
        });
        loader.present();
  
        this.storage.get('user').then((us:UserStore)=>{
          us.apmac = this.changeNewMac;
          us.ip = this.changeNewIp;
          this.storage.set('user', us);

          setTimeout(()=>{
            window.location.reload();
          }, 1000);

        });
      }

    });
    
  }

}
