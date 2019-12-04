import { Component, Output, EventEmitter } from '@angular/core';
import { ModalController, AlertController, ViewController, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import * as echarts from 'echarts/dist/echarts.min';

/**
 * Generated class for the RouterspeedComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'routerspeed',
  templateUrl: 'routerspeed.html'
})
export class RouterspeedComponent {

  servers:any = [];
  localip:string = 'http://192.168.1.1:8080/SpeedTest/';
  selServer:any = null;

  ///////////
  mchart:any = null;
  option:any = null;

  pingData:any = '--';
  downloadData:any = '--';
  downloadDW:any = 'Mbps';
  uploadData:any = '--';
  uploadDW:any = 'Mbps';
  servername:any = '--';  
  countryname:any = '--';
  testing:boolean = false;

  @Output()
  cancleTest:EventEmitter<any> = new EventEmitter<any>();

  constructor(private modalCtrl:ModalController, private http:HttpClient, private alertCtrl:AlertController, private viewCtrl:ViewController,
    private loadingCtrl:LoadingController
    ) {
    this.showConnectWifi();
  }

  showConnectWifi(){
    const modal = this.modalCtrl.create('TiplinkrouterPage');
    modal.present();
    modal.onDidDismiss((res:any)=>{
      if(!res.cancle){
        //this.getServers();
      }else{
        this.cancleTest.emit('');
      }
    });
  }

  getServers(){
    
    //const loader = this.loadingCtrl.create({
    //    content: "正在连接网关...",
    //});    
    //loader.present();

    //this.http.get(this.localip + 'getSpeedServer').toPromise().then((res:any)=>{
      //loader.dismiss();
      
      //this.servers = res.data;
      
      //let best = this.servers[0]; 
      //this.pingData =  '--';
      //this.servername = best.name;
      //this.countryname = best.sponsor;
      //this.selServer = best.id;

      //this.initSpeed();
   /* }).catch((err)=>{
      loader.dismiss();
      
      const alert = this.alertCtrl.create({
        title: '连接网关失败',
        subTitle: '请确认手机Wifi已连接到网关再试',
        buttons: [{
          text: "取消",
          handler: ()=>{
            this.viewCtrl.dismiss();
          }
        },
        {
          text: '确认',
          handler : ()=>{
            const modal = this.modalCtrl.create('TiplinkrouterPage');
            modal.present();
            modal.onDidDismiss((res:any)=>{
              this.getServers();
              
            });     
          }
        }]
      });
      alert.present();
    });*/
  }

  dealStartTest(val){
    if(val.data){
      if(val.data.uploadData.length > 0){
        let lpdata = val.data.uploadData[val.data.uploadData.length - 1];
        this.uploadData = (lpdata['bit/s'] / 1000 / 1000).toFixed(2);
        this.option.series[0].data[0].name = '上传测试...';
        this.uploadDW  = 'Mbps';
        this.option.series[0].data[0].value = this.uploadData;
      }else if(val.data.download.length > 0){
        let lpdata = val.data.download[val.data.download.length - 1];
        this.downloadData = (lpdata['bit/s'] / 1000 / 1000).toFixed(2);
        this.option.series[0].data[0].name = '下载测试...';
        this.downloadDW  = 'Mbps';
        this.option.series[0].data[0].value = this.downloadData;
      }
      this.mchart.setOption(this.option, true);
      return true;
    }
    return false;
  }

  dealVal(id){
    this.getValue(id, (val:any)=>{
      //let result = this.dealStartTest(val);
      let code = val.code;

      if(code == 1){
        setTimeout(()=>{this.dealVal(id);}, 5000);
      }else if(code == 0){
        this.completeTest(val.data);
      }else{

      }
      //val = null;

    });
  }

  startTest(){
    if(this.testing){
      return;
    }
    this.http.get(this.localip + 'startTest').toPromise().then((res:any)=>{
      this.dealVal(res.data);

    }).catch((err)=>{
      const alert = this.alertCtrl.create({
        title: '启动失败!',
        subTitle: '请确保手机已连接到网关Wifi!',
        buttons: [{
          text: '确定'
        }]
      });
      alert.present();

      this.testing = false;
      //this.option.series[0].data[0].name = '等待测试';
      //this.option.series[0].data[0].value = 0;
      //this.mchart.setOption(this.option, true);

    });
    
    this.testing = true;
    this.pingData = '--';
    this.downloadData = '--';
    this.uploadData = '--';
    //this.option.series[0].data[0].name = '正在连接...';
    //this.option.series[0].data[0].value = 0;
    //this.mchart.setOption(this.option, true);

  }

  getValue(id, callback){
    this.http.get(this.localip + 'getValue?uid=' + id).toPromise().then((res)=>{
      callback(res);
    });
  }

  initSpeed(){
    this.mchart = echarts.init(document.getElementById('speedchart'));
    this.option = {
        backgroundColor: '#F2F6FA',
        series: [
          {
            name: 'Download',
            type: 'gauge',
            min: 0,
            max: 100,
            splitNumber: 10,
            radius: '78%',
            precision: 2,
            axisLine: {
              show: true,
              lineStyle: {
                width: 0,
                shadowBlur: 0,
                color: [
                    [0.2, '#7851EA'],
                    [0.5, '#7851EA'],
                    [0.7, '#3FCB98'],
                    [1, '#3FCB98']
                ]
              }
            },
            axisTick: {
              length: -10, // 属性length控制线长
              lineStyle: { // 属性lineStyle控制线条样式
                  color: 'auto'
              },
              width:2
            },
            axisLabel:{
              show: true,
              distance: 10
            },
            splitLine: { // 分隔线
                length: -10, // 属性length控制线长
                lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
            },
            pointer: {
              width: 4,
              length:'80%'
            },
            detail: {
              textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#000000',
                padding: [-170, 0, 0, 0],
                fontSize:25,
                fontFamily: "Segoe UI"
              },
              formatter: function (value) {
                  return value;
              },
            },
            title: {
              offsetCenter: ['0', '33%'],
              fontSize: 18,
              color: "#666",
              show: true
            },
            data: [{ value: 0, name: '' }]
          }
        ]
      };
      this.initMychart();
  }

  initMychart(){
    var formatSpeed = function(value:any) {
        if(value == 0){
            return '';
        }
        value = (Math.round(value * 100) / 100).toFixed(2);
        value = (value > 1000) ? (value / 1000).toFixed(2) + ' Gbps' : value + ' Mbps';
        
        return value;
    }
    this.option.series[0].data[0].value = 0;
    this.option.series[0].data[0].name = '等待测试';
    this.option.series[0].detail.formatter = formatSpeed;
    this.option.series[0].detail.show = true;
    this.mchart.setOption(this.option, true);
  }

  completeTest(data){
    this.testing = false;
    this.downloadData = (data.download / 1000).toFixed(1);
    this.uploadData = (data.uploadData / 1000).toFixed(1);
    //this.option.series[0].data[0].value = 0;
    //this.option.series[0].data[0].name = '测试完毕';
    //this.mchart.setOption(this.option, true);
  }

}
