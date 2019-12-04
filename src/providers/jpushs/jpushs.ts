import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

import { JPush } from "@jiguang-ionic/jpush";
import { Device } from "@ionic-native/device";
import { BASEURL } from '../common';

/*
  Generated class for the JpushsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JpushsProvider {
  devicePlatform:string;

  constructor(
    public http: HttpClient, 
    private jpush: JPush, 
    private device: Device,
    public toastCtrl: ToastController
  ) {
    
  }

  initJPUSH(us){
    this.devicePlatform = this.device.platform;
    this.jpush.init().then(result => {
    }).catch(error => {
    });

    this.jpush.setDebugMode(true);

    this.jpush.getRegistrationID().then(rId => {
      let purl = `${BASEURL}ext/v1/users/save_user_cid?userId=${us.userId}&cid=${rId}`;
      let pro = this.http.post(purl, {headers: {Authorization: us.token}}).toPromise();
      pro.then((res:any)=>{});

    }).catch((err)=>{
      console.log(err);
    });

    this.initEventListener();
  }

  resetBadage(){
    this.jpush.setBadge(0);
    this.jpush.setApplicationIconBadgeNumber(0);
    this.jpush.resetBadge();
  }

  initEventListener(){
    this.jpush.getUserNotificationSettings().then(result => {
      //if(result == 0)
        //this.showLog("系统设置中已关闭应用推送");
      //if(result > 0)
        //this.showLog("系统设置中打开了应用推送");
    });

    document.addEventListener(
      "jpush.receiveNotification",
      (event: any) => {
        var content;
        if (this.devicePlatform == "Android") {
          content = event.alert;
        } else {
          content = event.aps.alert;
        }
        //alert("Receive notification: " + JSON.stringify(event));
      },
      false
    );

  }

  showLog(str){
    const toast = this.toastCtrl.create({
      message: str,
      duration: 3000
    });
    toast.present();
  }

}
