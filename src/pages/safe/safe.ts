import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';
import { AlertController, ViewController } from 'ionic-angular';
import { SafeProvider } from '../../providers/safe/safe';

import * as _ from 'lodash';
import * as moment from 'moment';

/**
 * Generated class for the SafePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-safe',
  templateUrl: 'safe.html',
  providers: [SafeProvider]
})
export class SafePage {

  safeType:string = 'alert';

  stime:string = '';
  etime:string = '';
  pagenum:number = 1;
  pagesize:number = 10;
  totalpage:number = 0;

  alertLists:any = [];

  mapDatas:any = [];
  l1count:number = 0;
  l2count:number = 0;
  l3count:number = 0;

  l1s = [];
  l2s = [];
  l3s = [];

  showback:boolean = false;
  olddatas:any = [];
  showSingle:boolean = false;

  showHeader:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl:ViewController,
    public serv:SafeProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
      let ptp = this.navParams.get('type');
      if(ptp && ptp == 'green'){
        this.safeType = 'green';
        this.showback = true;
        this.showHeader = true;
      }else if(ptp && ptp == 'alert'){
        this.safeType = 'alert';
        this.showback = true;
        this.showHeader = true;
      }else{
        this.safeType = 'alert';
      }
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    let d = new Date();
    let now:moment.Moment = moment(d);
    let yes:moment.Moment = moment(d);
    yes.add(-7, 'month');

    this.stime = yes.format('YYYY-MM-DDTHH:mm:ss') + '.0Z';
    this.etime = now.format('YYYY-MM-DDTHH:mm:ss') + '.0Z';

    var jwds = [[121.4648, 31.2891],
    [-4.388361, 11.186148],
    [-118.24311, 34.052713],
    [114.195466, 22.282751],
    [-87.801833, 41.870975],
    [-4.62829, 7.72415],
    [-1.657222, 51.886863],
    [10.01959, 54.38474],
    [45.326912, 41.101891],
    [89.116876, 67.757906],
    [-48.678945, -10.493623],
    [31.815593, 31.418032],
    [2.175129, 41.385064],
    [104.88659, 11.545469],
    [9.189948, 45.46623],
    [-56.162231, -34.901113],
    [32.608571, -25.893473],
    [3.054275, 36.753027],
    [55.269441, 25.204514],
    [17.108519, 48.179162],
    [150.993137, -33.675509],
    [-121.910642, 41.38028],
    [144.999416, -37.781726],
    [-99.094092, 19.365711],
    [-123.023921, 49.311753]]

    this.serv.getList(this.pagenum, this.pagesize, this.stime, this.etime, (val:any)=>{
      this.alertLists = val.result;
      this.totalpage = val.totalPageCount;

      let datas = [];
      let inx = 0;
      for(let r of val.result){
        //if(r.srcLongitude && r.srcLatitude){
          let curpos = jwds[inx % jwds.length];
          inx++;
          r.srcLongitude = curpos[0];
          r.srcLatitude = curpos[1];
          if(r.priority == 3){
            datas.push({"id": inx, "name":r.sigName,"value":[r.srcLongitude,r.srcLatitude,r.ipSrc], type: 'l1'});
            this.l1count++;
            this.l1s.push({"id": inx, "name":r.sigName, "time": moment(r.timestamp).format('YYYY-MM-DD HH:mm:ss')});
          }else if(r.priority == 2){
            datas.push({"id": inx, "name":r.sigName,"value":[r.srcLongitude,r.srcLatitude,r.ipSrc], type: 'l2'});
            this.l2s.push({"id": inx, "name":r.sigName, "time": moment(r.timestamp).format('YYYY-MM-DD HH:mm:ss')});
            this.l2count++;
          }else{
            datas.push({"id": inx, "name":r.sigName,"value":[r.srcLongitude,r.srcLatitude,r.ipSrc], type: 'l3'});
            this.l3s.push({"id": inx, "name":r.sigName, "time": moment(r.timestamp).format('YYYY-MM-DD HH:mm:ss')});
            this.l3count++;
          }
        //}
      }
      this.olddatas = datas;
      this.mapDatas = datas;
    });

    this.initMap();
  }

  showCurrent(l){
    this.mapDatas = _.filter(this.olddatas, (d)=>{return d.id == l.id});
    for(let l of this.l1s){
      l.selected = false;
    }
    for(let l of this.l2s){
      l.selected = false;
    }
    for(let l of this.l3s){
      l.selected = false;
    }
    l.selected = true;
    this.showSingle = true;
  }

  showAll(){
    for(let l of this.l1s){
      l.selected = false;
    }
    for(let l of this.l2s){
      l.selected = false;
    }
    for(let l of this.l3s){
      l.selected = false;
    }
    this.mapDatas = this.olddatas;
    this.showSingle = false;
  }

  initMap(){
    /*this.mapDatas = [
      {"name":"齐齐哈尔","value":[123.97,47.33,null], type: 'l1'},
      {"name":"盐城","value":[120.13,33.38,null], type: 'l1'},
      {"name":"青岛","value":[120.33,36.07,null], type: 'l2'},
      {"name":"金昌","value":[102.188043,38.520089,null], type: 'l2'},
      {"name":"泉州","value":[118.58,24.93,null], type: 'l3'},
      {"name":"拉萨","value":[91.11,29.97,null], type: 'l3'},
      {"name":"上海浦东","value":[121.48,31.22,null], type: 'l3'},
      {"name":"攀枝花","value":[101.718637,26.582347,null], type: 'l3'}
    ];*/
  }

  getMore(){
    this.pagenum++;
    let newarr = this.alertLists
    this.serv.getList(this.pagenum, this.pagesize, this.stime, this.etime, (val:any)=>{
      for(let d of val.result){
        newarr.push(d);
      }
      this.alertLists = newarr;
      this.totalpage = val.totalPageCount;
    });
  }

}
