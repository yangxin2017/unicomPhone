import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';

import * as echarts from 'echarts/dist/echarts.min';
import * as speedTest from '@lovanya/speedtest';

/**
 * Generated class for the SpeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({ 
  selector: 'page-speed',
  templateUrl: 'speed.html',
})
export class SpeedPage {

  speedType:string = 'equip';
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

  selserver:any = null;
  serverList:any = [];

  isIniting:boolean = true;

  rgtitle:string = '网关测速';

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl:ViewController, public loadingCtrl: LoadingController) {
  }

  changeRightTitle(){
      if(this.speedType == 'router'){
        this.speedType = 'equip';
      }else{
        this.speedType = 'router';
      }
      this.rgtitle = this.speedType == 'router' ? '网关测速' : '宽带测速';
  }

  ionViewDidLoad() {
    //setTimeout(()=>{this.initSpeed();}, 1000);
    //this.initTestData();
    this.showLoading();
  }

  closeModal(){ 
    this.viewCtrl.dismiss();
  }

  showLoading(){
    const loader = this.loadingCtrl.create({
        content: "请稍候...",
        duration: 5000
    });    
    loader.present();
  }
  
  initTestData(){  
    const loader = this.loadingCtrl.create({
        content: "请稍候...",
        duration: 5000
    });    
    loader.present();

    let testMD = speedTest({maxTime: 50, id: '4713'});
    testMD.on('servers', servers => {
        //this.serverList = servers; 
        servers = null;
    });
    testMD.on('bestservers', serves=>{
        this.serverList = serves; 
        let ss = serves[0];
        this.countryname = ss.sponsor;
        console.log(serves)
        this.pingData = ss.bestPing.toFixed(1);
    });  
    testMD.on('config', config=>{
        //console.log(config);
        this.servername = config.client.isp;
    });
    testMD.on('done', data=>{
        //console.log('done', data);
        this.isIniting = true;
        loader.dismiss();
    });
    /*testMD.on('downloadspeedprogress', speed => {
        console.log('download',speed);
    }); 
    testMD.on('uploadspeedprogress', speed => {
        console.log('upload',speed);
    });*/  
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
                    [0.2, '#D764FE'],
                    [0.5, '#C45DFE'],
                    [0.7, '#7EDFFF'],
                    [1, '#66FFFF']
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

      //this.option.series[0].data[0].value = 0;
      //this.option.series[0].data[0].name = '';
      //this.option.series[0].detail.formatter = '';
      //this.mchart.setOption(this.option, true);
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

  startTest(){
    this.testing = true;

    this.pingData = '--';
    this.downloadData = '--';
    this.uploadData = '--';

    this.option.series[0].data[0].name = '正在连接...';
    this.option.series[0].data[0].value = 0;
    this.mchart.setOption(this.option, true);

    //start
    let option:any = {maxTime: 10000};
    if(this.selserver){
        option.serverId = this.selserver;
        //option.serversUrl = this.selserver.url;
    }

    let testMD = speedTest(option);
    testMD.on('servers', servers => {
        //this.serverList = servers;
        servers = null;
    });
    testMD.on('bestservers', serves=>{
        console.log(serves);
        let ss = serves[0];
        this.countryname = ss.sponsor;
        this.pingData = ss.bestPing.toFixed(1);
        serves = null;
    });
    testMD.on('config', config=>{
        this.servername = config.client.isp;
        config = null;
    });
    testMD.on('done', data=>{
        
        //console.log(data);

        this.completeTest();
    });
    testMD.on('downloadspeedprogress', speed => {
        this.option.series[0].data[0].name = '下载测试...';
        this.option.series[0].data[0].value = speed * .125;
        this.mchart.setOption(this.option, true);
        speed = null;
    });
    testMD.on('uploadspeedprogress', speed => {
        this.option.series[0].data[0].name = '上传测试...';
        this.option.series[0].data[0].value = speed * .125;
        this.mchart.setOption(this.option, true);
        speed = null;
    });
    testMD.on('downloadspeed', speed => {
        let download = speed * .125;
        if(download > 1000){
            this.downloadData = (download / 1000).toFixed(2);
            this.downloadDW = 'Gbps';
        }else{
            this.downloadData = (download).toFixed(2);
            this.downloadDW = 'Mbps';
        }
        speed = null;
    });
    testMD.on('uploadspeed', speed => {
        let upload = speed * .125;
        if(upload > 1000){
            this.uploadData = (upload / 1000).toFixed(2);
            this.uploadDW = 'Gbps';
        }else{
            this.uploadData = (upload).toFixed(2);
            this.uploadDW = 'Mbps';
        }
        speed = null;
    });
  }

  completeTest(){
    this.testing = false;
    this.option.series[0].data[0].value = 0;
    this.option.series[0].data[0].name = '测试完毕';
    this.mchart.setOption(this.option, true);
  }

  cancleRouterTest(){
      this.speedType = 'equip';
      this.showLoading();
      //setTimeout(()=>{this.initSpeed();}, 1000);
    //this.initTestData();
  }

}
