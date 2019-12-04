import { Component, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, ModalController } from 'ionic-angular';

/**
 * Generated class for the BindrouterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bindrouter',
  templateUrl: 'bindrouter.html',
})
export class BindrouterPage {

  searchrouter:boolean = false;
  step:number = 1;
  inputMacString:string = '';

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, private viewCtrl:ViewController,
    private modalCtrl:ModalController,
    public alertCtrl: AlertController,
  ) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad BindrouterPage');
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  connectWIFI(){
    this.searchrouter = true;
    setTimeout(()=>{
      this.step = 2;
    }, 3000);
  }

  manInput(){
    const modal = this.modalCtrl.create('BindMacPage');
    modal.present();
    modal.onDidDismiss((mac:any)=>{
      if(mac == null){

      }else if(mac.success){
        this.inputMacString = mac.data;
        this.step = 4;
      }else{
        const alert = this.alertCtrl.create({
          title: '失败',
          subTitle: mac.error + '<br/>请重新输入或扫码绑定',
          buttons: [{
            text: '确定',
            handler: ()=>{
              //alert.dismiss();
            }
          }]
        });
        alert.present();

      }
    });
    //this.step = 4;
  }

  confirmForm(){
    this.step = 4;
  }

  fininsh(){
    this.step = 1;
    this.viewCtrl.dismiss({apmac: this.inputMacString});

  }

}
