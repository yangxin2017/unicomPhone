import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoadingController, ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { MainProvider } from '../../providers/main/main';
import { Storage } from '@ionic/storage';
import { UserStore } from '../../pages/user.storage';
import { ChangeDetectorRef } from '@angular/core';
import { SafeProvider } from '../../providers/safe/safe';
import { EquipProvider } from '../../providers/equip/equip';

import { JpushsProvider } from '../../providers/jpushs/jpushs';

import * as _ from 'lodash';
/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
  providers: [MainProvider, SafeProvider, EquipProvider]
})
export class MainPage {

  registed: boolean = true;

  staticData: any = {
    alert: {
      pre: 0,
      cur: 0,
      sum: 0
    },
    equip: {
      dn: 0,
      sj: 0,
      qt: 0,
      pad: 0,
      total: 0
    },
    llsj: {
      pre: [0, 'B'],
      cur: [0, 'B'],
      total: [0, 'B']
    }
  };

  rankData: any = [];

  @ViewChild('realchart')
  greetDiv: any;

  zhsh: string = "";
  qd: string = "";

  isSign: boolean = true;

  routerInfo: any = {
    apmac: '--',
    name: '未绑定网关',
    isuse: false,
    online: false
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public serv: MainProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private modalCtrl: ModalController,
    public store: Storage, public cd: ChangeDetectorRef,
    private sserv: SafeProvider,
    private eserv: EquipProvider,
    private jpush: JpushsProvider
  ) {
    /* this.store.get('user').then((val: UserStore) => {
      console.log(val)
    }).catch((err) => {

    }); */
    // this.jpush.resetBadage();
    /*this.serv.getLinkJson().then((res:any)=>{
      this.zhsh = res.zhsh;
      this.qd = res.qd;
    });

    this.serv.isDaySign((pro)=>{
      pro.then((res:any)=>{
        this.isSign = res;
      });
    });*/
  }

  getllNumber(num) {
    let dw = 'B';
    if (num / 1024 > 1) {
      dw = 'KB';
      num = num / 1024;
      if (num / 1024 > 1) {
        dw = 'MB';
        num = num / 1024;
        if (num / 1024 > 1) {
          dw = 'GB';
          num = num / 1024;
        }
      }
    }
    num = num.toFixed(2);
    return [num, dw];
  }

  ionViewDidLeave() {

  }
  ionViewDidEnter() {
    /*this.store.get('user').then((us:UserStore)=>{
      this.registed = us.isBindRouter;
      this.dealMain();
    });*/
  }

  dealMain() {
    if (this.registed) {
      this.serv.getAlert((datas:any)=>{
        let alert = datas[0]
        if (alert.length > 2) {
            this.staticData.alert.pre = alert[0].v;
            this.staticData.alert.cur = alert[1].v;
            this.staticData.alert.sum = alert[2].v;
          }
      });
      this.serv.getStatic((datas: any) => {
        //let alert = datas[0];
        let equip = datas[0];
        let llsj = datas[1];
        let signs = datas[2];
        // let links = datas[3];
        let rinfo = datas[3];

        // if (alert.length > 2) {
        //   this.staticData.alert.pre = alert[0].v;
        //   this.staticData.alert.cur = alert[1].v;
        //   this.staticData.alert.sum = alert[2].v;
        // }

        for (let m of equip) {
          if (m.type == 3) { //电脑
            this.staticData.equip.dn = m.amount;
          } else if (m.type == 1) { //手机
            this.staticData.equip.sj = m.amount;
          } else if (m.type == 0) { //其他
            this.staticData.equip.qt = m.amount;
          } else if (m.type == 2) { //pad
            this.staticData.equip.pad = m.amount;
          }
          this.staticData.equip.total += m.amount;
        }

        let d1 = llsj[0].value;
        let d7 = llsj[1].value;
        let d15 = llsj[1].value + llsj[0].value;
        this.staticData.llsj.cur = this.getllNumber(d1);
        this.staticData.llsj.pre = this.getllNumber(d7);
        this.staticData.llsj.total = this.getllNumber(d15);
        this.staticData.llsj.total[0] = parseInt(this.staticData.llsj.total[0]);

        // this.zhsh = links.zhsh;
        // this.qd = links.qd;

        this.isSign = signs;

        this.routerInfo.online = false;
        if (rinfo.apStatusLogs.length > 0) {
          this.routerInfo.online = rinfo.apStatusLogs[0].status == 1 ? true : false;
        }

      });

      /*
      let loader = this.loadingCtrl.create({
        content: "正在获取数据...",
      });
      loader.present();
      this.serv.getTop20((datas:any)=>{
        let d1 = [];
        for(let d of datas){
          if(d.longitude && d.latitude){
            d1.push({name: d.key, value: [d.longitude, d.latitude, d.value]});
          }
        }
        
        this.rankData = d1;
        loader.dismiss();
      }, ()=>{
        loader.dismiss();
      });*/
    }
  }

  ionViewDidLoad() {
    this.store.get('user').then((us: UserStore) => {

      setTimeout(() => {
        this.registed = us.isBindRouter;
        if (this.registed) {
          this.routerInfo.apmac = us.apmac;
          this.routerInfo.name = us.username;
          this.routerInfo.isuse = true;

          /*this.serv.getOverview((res:any)=>{
            this.routerInfo.online = res.user.status;

          }, ()=>{})*/

        }
        this.dealMain();
        this.cd.detectChanges();
      }, 1000);
    });
  }

  showlist() {
    this.navCtrl.push('RoutersPage');
  }

  scaning: boolean = false;
  inter: any = null;
  second: number = 1;
  isOver: boolean = false;

  goScan() {
    if (this.registed) {
      const modal = this.modalCtrl.create('SafePage', {type: 'alert'});
      modal.present();
      // this.scaning = true;
      // this.sserv.startScan(() => { });

      // //getEquips
      // this.getEquipLists();

      // this.inter = setInterval(() => {
      //   this.second++;
      //   this.sserv.checkScan((res: any) => {
      //     if (res.success) {
      //       this.stopScan();
      //     }
      //   });
      //   if (this.second >= 3) {
      //     //this.stopScan();
      //   }
      // }, 3000);
    } else {
      const alert = this.alertCtrl.create({
        title: '启动失败!',
        subTitle: '请先绑定网关，然后再进行漏洞扫描!',
        buttons: ['确定']
      });
      alert.present();
    }


    //const modal = this.modalCtrl.create('ScanPage');
    //modal.present();
  }


  scanEquips: any = [];
  getEquipLists() {
    this.eserv.getEquipPageData(1, 50, (datas) => {
      let val1 = datas[0];
      let val = datas[1];

      this.scanEquips = _.filter(val.result, d => { return d.status != '10'; });//val.result;

    }, {});
  }

  stopScan() {
    this.scaning = false;
    this.isOver = true;
    this.second = 1;
    if (this.inter) {
      clearInterval(this.inter);
    }
  }

  showResult() {
    const modal = this.modalCtrl.create('ScanPage', { data: this.scanEquips });
    modal.present();
  }

}
