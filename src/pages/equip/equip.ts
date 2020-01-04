import { Component, Pipe, PipeTransform } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoadingController, ModalController, ToastController  } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { EquipProvider } from '../../providers/equip/equip';
import * as _ from 'lodash';
import * as moment from 'moment';

/**
 * Generated class for the EquipPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-equip',
  templateUrl: 'equip.html',
  providers: [EquipProvider]
})



export class EquipPage {

  equipTp:string = 'all';

  routerData:any = null;

  pagenum:number = 1;
  pagesize:number = 50;
  totalpage:number = 0;

  equiplist:any = {
    all: [],
    ok: [],
    no: [],
    black: [],
    white: [],
    xs: [],
    ds: []
  };

  loading:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public serv:EquipProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController
  ) {
  }

  ionViewDidEnter(){
    
  }

  ionViewDidLoad() {
    this.loading = true;

    this.serv.getEquipPageData(this.pagenum, this.pagesize, (datas)=>{
      let val1 = datas[0];
      let val = datas[1];

      this.routerData = val1;

      this.loading = false;
      this.totalpage = val.totalPageCount;
      for(let d of val.result){
        d.createTime = moment(d.createTime).format('YYYY-MM-DD HH:mm:ss');
      }
      this.equiplist.all = val.result;
      this.equiplist.ok = _.filter(val.result, d=>{return d.status != '10';});
      this.equiplist.no = _.filter(val.result, d=>{return d.status == '10';});
      this.equiplist.white = _.filter(val.result, d=>{return d.status == '20' || !d.status;});
      this.equiplist.black = _.filter(val.result, d=>{return d.status == '30';});
      this.equiplist.xs = _.filter(val.result, d=>{return d.status == '40';});
      this.equiplist.ds = _.filter(val.result, d=>{return d.status == '9-17';});

    }, ()=>{
      this.loading = false;
    })

    /*
    this.serv.routerInfor((val:any)=>{
      this.routerData = val;
    });

    this.serv.getEquips(this.pagenum, this.pagesize, (val:any)=>{
      this.loading = false;

      this.totalpage = val.totalPageCount;
      for(let d of val.result){
        d.createTime = moment(d.createTime).format('YYYY-MM-DD HH:mm:ss');
      }
      this.equiplist.all = val.result;
      this.equiplist.ok = _.filter(val.result, d=>{return d.status != '10';});
      this.equiplist.no = _.filter(val.result, d=>{return d.status == '10';});
      this.equiplist.black = _.filter(val.result, d=>{return d.status == '30';});
    }, ()=>{
      this.loading = false;
      
    });*/
    
  }

  segmentChanged(ev){
    this.equiplist.ok = _.filter(this.equiplist.all, d=>{return d.status != '10';});
    this.equiplist.no = _.filter(this.equiplist.all, d=>{return d.status == '10';});
    this.equiplist.white = _.filter(this.equiplist.all, d=>{return d.status == '20' || !d.status;});
    this.equiplist.black = _.filter(this.equiplist.all, d=>{return d.status == '30';});
    this.equiplist.xs = _.filter(this.equiplist.all, d=>{return d.status == '40';});
    this.equiplist.ds = _.filter(this.equiplist.all, d=>{return d.status == '9-17';});
  }

  changeAuth(mod, auth){
    let loader = this.loadingCtrl.create({
      content: "处理中...",
    });
    this.serv.setEquipAuth(mod.id, auth, ()=>{
      loader.dismiss();
      mod.status = auth;

      let tipstr = '';
      if(auth == '40'){
        tipstr = '设备已设置为限时1小时使用';
      }else if(auth == '30'){
        tipstr = '设备已设置黑名单';
      }else if(auth == '20'){
        tipstr = '设备已设置白名单';
      }else{
        let str = this.structure.lower + '点到' + this.structure.upper + '点';
        tipstr = '设备已设置为' + str + '使用';
      }

      const toast = this.toastCtrl.create({
        message: tipstr,
        duration: 3000
      });
      toast.present();
    });
  }

  goAlert(){
    this.navCtrl.parent.select(2);
  }

  seeRouterLL(){
    const modal = this.modalCtrl.create('RealchartPage');
    modal.present();
  }

  structure: any = {lower: 9, upper: 17};
  showTimedia:boolean = false;
  curDevice:any = null;
  showDialog(d){
    let str = d.status;
    if(str.indexOf('-') >= 0){
      let arr = str.split('-');
      if(arr.length > 1){
        this.structure.lower = parseInt(arr[0]);
        this.structure.upper = parseInt(arr[1]);
      }
    }
    this.showTimedia = true;
    this.curDevice = d;
  }
  closeDialog(){
    this.showTimedia = false;
  }
  confirmDialog(){
    if(this.curDevice){
      let str = this.structure.lower + '-' + this.structure.upper;
      this.changeAuth(this.curDevice, str);
      this.showTimedia = false;
    }
  }

}


