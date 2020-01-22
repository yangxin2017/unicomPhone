import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { UserProvider } from "../../providers/user/user";
import { LoadingController } from "ionic-angular";
import { AlertController } from "ionic-angular";
import { UserStore } from "../user.storage";
import { Storage } from "@ionic/storage";
import { ModalController } from "ionic-angular";

import { Network } from "@ionic-native/network";

import { JpushsProvider } from "../../providers/jpushs/jpushs";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "loading.html",
  providers: [UserProvider]
})
export class LoadingPage {
  username: string = "";
  password: string = "";

  ////

  ////

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public serv: UserProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private storage: Storage
  ) {
    this.storage.get("user").then((us: UserStore) => {
      if (us) {
        //this.jpush.initJPUSH(us);
        this.navCtrl.setRoot("TabPage");
      }
    });
    this.storage.get("login_username").then((uname: string) => {
      this.username = uname;
    });
    //
    let p = this.getQueryVariable("p");
    let sign = this.getQueryVariable("sign");
    let ip = this.getQueryVariable("ip");
    let mac = this.getQueryVariable("macAddress");
    

    if (p && sign) {
      let loader = this.loadingCtrl.create({
        content: "登录中..."
      });
      this.serv.ssologin(p, sign, ip).then((res: any) => {
        if(res && res.token){
          //alert("get message from ssologin")
          this.saveInfor(res, loader);
          console.log(res);
          let val = res.ip + ',' + res.macAddress;
          this.storage.set('myInfo', val);
        }
      });
    }else{
        this.navCtrl.setRoot("LoginPage");
    }
  }

  ionViewDidLoad() {}

  getQueryVariable(variable) {
    if (window.location.href) {
      var query = window.location.href.split("?");
      if (query.length > 1) {
        let querystr = query[1];
        var vars = querystr.split("&");
        for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split("=");
          if (pair[0] == variable) {
            return pair[1];
          }
        }
      }
    }
    return false;
  }

  saveInfor(val, loader) {
    let token = val.token;
    //this.serv.getUserinfo(this.username, token).then((val:any)=>{
    let us = new UserStore();
    us.email = val.emailAddr;
    us.phoneNumber = val.phoneNumber;
    us.token = token;
    us.userId = val.userId;
    us.username = val.userId.split("@")[0];
    us.id = val.id;
    us.password = val.password;
    us.birth = val.birthday;
    us.verifynum = val.identity;
    us.wxcode = val.wx;
    us.kdcode = "";



    
    this.storage.set("login_username", this.username);
    this.serv.getAps(token, (res: any) => {
      let caches = [];
      for (let r of res) {
        if (r.apMacAddr != "") {
          caches.push({
            apmac: r.apMacAddr,
            ip: r.innerIpShow,
            alias: r.alias,
            apType: r.apType
          });
        }
      }
      us.arrEquips = caches;

      if (us.arrEquips.length > 0) {
        us.apmac = us.arrEquips[0].apmac;
        us.ip = us.arrEquips[0].ip;
        us.isBindRouter = true;
      } else {
        us.isBindRouter = false;
      }

      loader.dismiss();

      this.storage.set("user", us);

      this.navCtrl.setRoot("TabPage");

      //this.jpush.initJPUSH(us);
    });
    //});
  }
}
