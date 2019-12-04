import { Component, Input } from '@angular/core';
import { ModalController, ToastController, AlertController } from 'ionic-angular';
import { MainProvider } from '../../providers/main/main';

declare var cordova:any;
/**
 * Generated class for the UniFastlinkComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'uni-fastlink',
  templateUrl: 'uni-fastlink.html',
  providers: [MainProvider]
})
export class UniFastlinkComponent {

  @Input()
  zhsh:string = "";
  @Input()
  qd:string = "";
  @Input()
  registed:boolean = false;
  @Input()
  isSign:boolean = true;

  constructor(private modalCtrl:ModalController, private serv:MainProvider,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
  }

  goBind(){
    const modal = this.modalCtrl.create('BindMacPage');
    modal.present();
  }

  goSpeed(){
    const modal = this.modalCtrl.create('SpeedPage', {type: 'green'});
    modal.present();
  }

  goGreen(){
    if(this.registed){
      const modal = this.modalCtrl.create('SafePage', {type: 'green'});
      modal.present();
    }else{
      const alert = this.alertCtrl.create({
        title: '请求失败!',
        subTitle: '请先绑定网关，然后再查看!',
        buttons: [{
          text: '确定'
        }]
      });
      alert.present();
      //this.goBind();
    }
  }

  goWeb(title){
    let url = "";
    if(title == '智慧生活'){
      url = this.zhsh;
      const toast = this.toastCtrl.create({
        message: "敬请期待",
        duration: 3000,
        position: "top"
      });
      toast.present();
      // cordova.InAppBrowser.open("http://112.124.0.4:8090/haweb/cucczj/index.html#/main", "_self", "hideurlbar=yes");

    }else{
      url = this.qd;
      this.serv.signUp();
      this.isSign = true;

      const toast = this.toastCtrl.create({
        message: "已签到",
        duration: 3000
      });
      toast.present();

      //////
      //const modal = this.modalCtrl.create('BlankPage', {title: title, url: url});
      //modal.present();
    }
  }

}
