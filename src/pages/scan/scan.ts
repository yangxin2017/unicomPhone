import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

import { SafeProvider } from '../../providers/safe/safe';
/**
 * 
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
  providers: [SafeProvider]
})
export class ScanPage {

  ing:boolean = false;
  second:number = 1;
  inter:any = null;

  isOver:boolean = true;

  scandatas:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    private serv: SafeProvider,
    public modalCtrl: ModalController
  ) {
    this.scandatas = this.navParams.get('data');
    console.log(this.scandatas);
  }

  ionViewWillEnter(){
    /*this.ing = false;
    this.second = 0;
    
    if(this.inter){
      clearInterval(this.inter);
    }
    this.inter = null;

    this.isOver = false;
    console.log('enter');*/
  }

  ionViewDidLoad() {
    
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  startScan(){
    this.serv.startScan(()=>{});
    this.ing = true;
    this.inter = setInterval(()=>{
      this.second++;
      this.serv.checkScan((res:any)=>{
        if(res.success){
          this.stopScan();
        }
      });
      if(this.second >= 31){
        this.stopScan();
      }
    }, 1000);
  }

  stopScan(){
    this.isOver = true;
    if(this.inter){
      clearInterval(this.inter);
    }
  }

  goDetail(equip){
    const modal = this.modalCtrl.create('ScandetailPage', {equip: equip, data: {}});
    modal.present();
  }

}
