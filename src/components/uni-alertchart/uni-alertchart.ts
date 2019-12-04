import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';

import * as echarts from 'echarts/dist/echarts.min';

import { Storage } from '@ionic/storage';
import { UserStore } from '../../pages/user.storage';

import * as SockJS from 'sockjs-client/dist/sockjs.min';
import * as Stomp from 'stompjs/lib/stomp.min';
import * as moment from 'moment';

/**
 * Generated class for the UniAlertchartComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'uni-alertchart',
  templateUrl: 'uni-alertchart.html'
})
export class UniAlertchartComponent  {

  @Input()
  registed:boolean = false;

  loadingtxt = '正在获取数据...';
  loading = true;

  cstime:string = moment().format('YYYY-MM-DD HH:mm:ss');
  cetime:string = moment().format('YYYY-MM-DD HH:mm:ss');
  stompClient:any = null;
  socketInArr:any = [];
  socketOutArr:any = [];
  chartMod:any = null;

  constructor(public store:Storage, private modalCtrl:ModalController) {
    /*let m1 = moment().add(-60, 'minute').format('YYYY-MM-DD HH:mm:ss');
    let m2 = moment().add(-70, 'minute').format('YYYY-MM-DD HH:mm:ss');
    let m3 = moment().add(-80, 'minute').format('YYYY-MM-DD HH:mm:ss');
    let m4 = moment().add(-90, 'minute').format('YYYY-MM-DD HH:mm:ss');
    let m5 = moment().add(-100, 'minute').format('YYYY-MM-DD HH:mm:ss'); 
    this.socketOutArr.push([m1, 10]);
    this.socketOutArr.push([m2, Math.random() * 20 + 10]);
    this.socketOutArr.push([m3, Math.random() * 10 + 10]);
    this.socketOutArr.push([m4, Math.random() * 30 + 10]);
    this.socketOutArr.push([m5, Math.random()]);

    this.socketInArr.push([m1, 1]);
    this.socketInArr.push([m2, Math.random() * 1 + 1]);
    this.socketInArr.push([m3, Math.random() * 3 + 3]);
    this.socketInArr.push([m4, Math.random() * 1 + 1]);
    this.socketInArr.push([m5, Math.random()]);
    */
  }

  goBind(){
    const modal = this.modalCtrl.create('BindMacPage');
    modal.present();
  }

  disConnect(){
    if (this.stompClient != null) {
        this.stompClient.disconnect();
    }
    this.socketInArr = [];
    this.socketOutArr = [];
    if(this.chartMod){
        this.chartMod.dispose();
        this.chartMod = null;
    }
    this.loadingtxt = '正在获取数据...';
  }

  connect(){
    setTimeout(()=>{
        if(this.registed){
            this.store.get('user').then((us:UserStore)=>{
                this.initSocket(us.apmac);
            });
            
            this.drawCharts(this.socketInArr, this.socketOutArr);
        }
    }, 1000);
  }

  initSocket(apmac){
    let st:string = this.cstime;//jQuery('#sSTime').val();
    let et:string = this.cetime;//jQuery('#sETime').val();
    st = st.replace(' ', 'T') + '.0Z';
    et = et.replace(' ', 'T') + '.0Z';

    let paramIn:any = {
      "ioFlag": "",
      "createTimeBegin": st,
      "createTimeEnd": et
    };
    let paramOut:any = {
      "ioFlag": "",
      "createTimeBegin": st,
      "createTimeEnd": et
    };
    let url1 = "/ws/ap/ts/";
    let url2 = "/wsx/ap/ts/";

    paramIn = {
        "ioFlag": "IN",
        "createTimeBegin": st,
        "createTimeEnd": et,
        "apMacAddr": apmac
    };
    paramOut = {
        "ioFlag": "OUT",
        "createTimeBegin": st,
        "createTimeEnd": et,
        "apMacAddr": apmac
    };
    url1 = "/ws/ap/ts/" + apmac;
    url2 = "/wsx/ap/ts/" + apmac;
    this.initSocketDetail(apmac, st, et, url1, url2, paramIn, paramOut);
  }

  initSocketDetail(apmac, st, et, url1, url2, pi, po){
    var socket = new SockJS('http://39.105.18.142/hb/dolphin/initWebSocket/');

    this.stompClient = Stomp.Stomp.over(socket);
    this.stompClient.connect({}, (frame) => {
      //IN
      this.stompClient.send(url1 + "IN", {}, JSON.stringify(pi));
      this.stompClient.subscribe(url2 + "IN", (response) => {
        let json = JSON.parse(response.body);
        if(json){
          json.data.forEach(ele1=>{
            this.socketInArr.push([ele1.time, ele1.value / 1000]);
          });
          
          if(!this.chartMod){
            this.drawCharts(this.socketInArr, this.socketOutArr);
          }else{
            //this.socketInArr = _.drop(this.socketInArr, json.data.length);
            this.chartMod.setOption({
                series: [{
                    data: this.socketInArr
                },
                {
                    data: this.socketOutArr
                }]
            });
          }
        }
      });
      //OUT
      this.stompClient.send(url1 + "OUT", {}, JSON.stringify(po));
      this.stompClient.subscribe(url2 + 'OUT', (response) => {
        let json = JSON.parse(response.body);
        if(json){
          json.data.forEach(ele1=>{
            this.socketOutArr.push([ele1.time, ele1.value / 1000]);
          });
          
          if(!this.chartMod){
            this.drawCharts(this.socketInArr, this.socketOutArr);
          }else{
            //this.socketInArr = _.drop(this.socketInArr, json.data.length);
            this.chartMod.setOption({
                series: [{
                    data: this.socketInArr
                },
                {
                    data: this.socketOutArr
                }]
            });
          }
        }
      });

    });
  }

  drawCharts(d2, d1){
    this.chartMod = echarts.init(document.getElementById('piealert'));
    let option = null;
    option = {
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                label: {
                    show: true
                }
            }
        },
        color: ['#F9596F', '#3FCB98'],
        legend: {
            data:['下载', '上载'],
            itemGap: 5
        },
        grid: {
            top: '30',
            left: '10',
            right: '20',
            bottom: '30',
            containLabel: true
        },
        xAxis: [
            {
                type : 'time',
                boundaryGap: true
            }
        ],
        yAxis: [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name: '下载',
                type: 'line',
                data: d2,
                areaStyle: {normal: {opacity: 0.3}},
                lineStyle: {width:3},
                smooth: true
            },
            {
                name: '上载',
                type: 'line',
                data: d1,
                areaStyle: {normal: {opacity: 0.3}},
                lineStyle: {width:3},
                smooth: true
            }
        ]
    };
    this.chartMod.setOption(option);
    
  }

}
