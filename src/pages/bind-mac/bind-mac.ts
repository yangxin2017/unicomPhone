import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  App
} from "ionic-angular";
import { HttpClient } from "@angular/common/http";

import { MainProvider } from "../../providers/main/main";
import { AlertController } from "ionic-angular";
import { UserStore } from "../user.storage";
import { Storage } from "@ionic/storage";
import { BASEURL, BASEURL2 } from "../../providers/common";

import * as _ from "lodash";

/**
 * Generated class for the BindMacPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-bind-mac",
  templateUrl: "bind-mac.html",
  providers: [MainProvider]
})
export class BindMacPage {
  macstring: any = ["", "", "", "", "", "", "", "", "", "", "", ""];
  curindex: number = -1;
  isfresh: boolean = true;
  localip: string = "http://192.168.1.1:8080/b?apMacAddress=";
  //localip: string = `${BASEURL}ext/v1/ap/user_bind_ap`;

  bindType: string = "wg";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private serv: MainProvider,
    public alertCtrl: AlertController,
    private storage: Storage,
    private app: App,
    private http: HttpClient
  ) {
    let fre = this.navParams.get("fresh");
    if (fre && fre == "no") {
      this.isfresh = false;
    }
    let type = this.navParams.get("type");
    this.bindType = type;
  }

  ionViewDidLoad() {}

  closeModal() {
    this.viewCtrl.dismiss(null);
  }

  //post method
  bindInterServerAP(us: UserStore, mac, success) {
    this.http
      .get(this.localip + mac, { headers: { Authorization: us.token } })
      .toPromise()
      .then((res: any) => {
        if (res.data) {
          success(res.data);
        } else {
          const alert = this.alertCtrl.create({
            title: "绑定失败!",
            subTitle: "请检查输入的MAC地址是否正确,或输入其他MAC地址重试!",
            buttons: ["确定"]
          });
          alert.present();
        }
      })
      .catch((err: any) => {
        const alert = this.alertCtrl.create({
          title: "绑定失败!",
          subTitle: "请检查网络是否已经连接到网关Wifi!",
          buttons: ["确定"]
        });
        alert.present();
      });
  }
  //路由绑定
  bindForLY(us: UserStore, apmac, success) {
    this.storage.get("myInfo").then((ipmac: any) => {
      let arr = ipmac.split(",");
      if (arr.length == 2) {
        let ip = arr[0];
        let mac = arr[1];

        let param = `apMacAddr=${apmac}&phoneMac=${mac}&ip=${ip}`;
        this.serv.bindLY(param, (pro: any) => {
          pro
            .then((res: any) => {
              success(res.data);
            })
            .catch((err: any) => {
              const alert = this.alertCtrl.create({
                title: "绑定失败!",
                subTitle: "请检查网络是否已经连接到网关Wifi!",
                buttons: ["确定"]
              });
              alert.present();
            });
        });
      }
    });
  }

  bindForWB(apmac, success) {
    this.storage.get("user").then((us: UserStore) => {
      if (this.bindType == "wg") {
        this.bindInterServerAP(us, apmac, (newAP: any) => {
          console.log(newAP);

          us.arrEquips.push({ apmac: apmac, ip: "--", alias: apmac });
          us.isBindRouter = true;

          us.apmac = us.apmac; //apmac;
          us.ip = "--";

          let inx = _.findIndex(us.arrEquips, d => {
            return d.apmac == apmac;
          });

          this.storage.set("user", us);
          success();
        });
      } else {
        this.bindForLY(us, apmac, (newAP: any) => {});
      }

      /*const alert = this.alertCtrl.create({
        title: '绑定成功!',
        subTitle: '',
        buttons: [{
          text: '确定',
          handler: ()=>{
            this.viewCtrl.dismiss();

            if(this.isfresh){

              this.app.getRootNav().setRoot('TabPage');
              //window.location.reload();
            }
            
          }
        }]
      });
      alert.present();
      */
    });
  }

  bindAP() {
    let apmac: string = "";
    for (let i = 0; i < this.macstring.length; i += 2) {
      let a = this.macstring[i];
      let b = this.macstring[i + 1];
      if (a != "" && b != "") {
        apmac += a + b + ":";
      }
    }
    apmac = apmac.substr(0, apmac.length - 1);

    if (apmac.length == 17) {
      this.bindForWB(apmac, () => {
        this.viewCtrl.dismiss({ data: apmac, success: true });
      });
    } else {
      this.viewCtrl.dismiss({ error: "mac地址输入不完整", success: false });
    }

    /**/
  }

  clk(txt) {
    ++this.curindex;
    if (this.curindex >= this.macstring.length) {
      this.curindex = this.macstring.length - 1;
    }
    this.macstring[this.curindex] = txt;
  }
  clkret() {
    this.macstring[this.curindex--] = "";
    if (this.curindex <= -1) {
      this.curindex = -1;
    }
  }
  clkok() {}
}
