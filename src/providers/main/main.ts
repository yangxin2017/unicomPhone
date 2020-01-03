import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASEURL, BASEURL2 } from "../common";

import { Storage } from "@ionic/storage";
import { NavController, ModalController } from "ionic-angular";
import { UserStore } from "../../pages/user.storage";

/*
  Generated class for the MainProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MainProvider {
  constructor(
    public http: HttpClient,
    private store: Storage,
    private ctrl: NavController,
    private modalCtrl: ModalController
  ) {}

  checkStorage(callback) {
    this.store
      .get("user")
      .then((val: UserStore) => {
        callback(val);
      })
      .catch(err => {
        this.goLogin();
      });
  }

  goLogin() {
    //this.ctrl.setRoot('Err500Page');
    // TODO::
    // const modal = this.modalCtrl.create('Err500Page');
    // modal.present();
  }

  bindLY(param, success) {
    this.store
      .get("user")
      .then((us: UserStore) => {
        let purl = `${BASEURL}ext/v1/ap/user_bind_ap?${param}`;
        let pro = this.http
          .post(purl, null, { headers: { Authorization: us.token } })
          .toPromise();
        success(pro);
      })
      .catch(() => {
        this.goLogin();
      });
  }

  isDaySign(success) {
    this.store
      .get("user")
      .then((us: UserStore) => {
        let purl = `${BASEURL}ext/v1/users/is_day_sign`;
        let pro = this.http
          .get(purl, { headers: { Authorization: us.token } })
          .toPromise();
        success(pro);
      })
      .catch(() => {
        this.goLogin();
      });
  }
  getLinkJson() {
    let purl = `${BASEURL2}hzspec/link.json`;
    let pro = this.http.get(purl).toPromise();
    return pro;
  }

  getAlert(success) {
    this.store.get("user").then((us: UserStore) => {
      let purl = `${BASEURL}alert/v1/alerts/device/2week/total?apMacAddr=${us.apmac}`;
      let pro = this.http
        .post(purl, null, { headers: { Authorization: us.token } })
        .toPromise().then((res)=>{
          success(res);
        });
    });
  }

  getStatic(success) {
    this.store.get("user").then((us: UserStore) => {
      let purl2 = `${BASEURL}ext/v1/devices/overview?apMacAddress=${us.apmac}`;
      let pro2 = this.http
        .get(purl2, { headers: { Authorization: us.token } })
        .toPromise();

      let purl3 = `${BASEURL}dolphin/v1/packet_summarys/total1?macAddr=${us.apmac}`;
      let pro3 = this.http
        .get(purl3, { headers: { Authorization: us.token } })
        .toPromise();

      let purl4 = `${BASEURL}ext/v1/users/is_day_sign`;
      let pro4 = this.http
        .get(purl4, { headers: { Authorization: us.token } })
        .toPromise();

      let purl5 = `${BASEURL2}hzspec/link.json`;
      let pro5 = this.http.get(purl5).toPromise();

      let purl6 = `${BASEURL}ext/v1/ap/overview?apMacAddr=${us.apmac}`;
      let pro6 = this.http
        .get(purl6, { headers: { Authorization: us.token } })
        .toPromise();

      Promise.all([pro2, pro3, pro4, pro5, pro6])
        .then((datas: any) => {
          success(datas);
        })
        .catch((err: any) => {
          this.goLogin();
        });
    });
  }

  getTop20(success, fail) {
    this.store
      .get("user")
      .then((us: UserStore) => {
        let purl = `${BASEURL}dolphin/v1/packet_summarys/admin/ip/top?excludeRegexpList=192.168.*`;
        let pro = this.http
          .get(purl, { headers: { Authorization: us.token } })
          .toPromise();

        pro
          .then((val: any) => {
            success(val);
          })
          .catch(() => {
            this.goLogin();
          });
      })
      .catch(() => {
        fail();
      });
  }

  updateUser(updateUser: UserStore) {
    this.store
      .get("user")
      .then((us: UserStore) => {
        let purl = `${BASEURL}ext/v1/users/update`;
        let param = {
          alias: updateUser.username,
          birthday: updateUser.birth,
          emailAddr: updateUser.email,
          id: updateUser.id,
          identity: updateUser.verifynum,
          name: updateUser.username,
          phoneNumber: updateUser.phoneNumber,
          userId: updateUser.userId,
          wx: updateUser.wxcode,
          password: updateUser.password
        };
        this.http
          .post(purl, param, { headers: { Authorization: us.token } })
          .toPromise();
      })
      .catch(() => {
        this.goLogin();
      });
  }

  signUp() {
    this.store
      .get("user")
      .then((us: UserStore) => {
        let purl = `${BASEURL}ext/v1/users/sign`;
        let pro = this.http
          .get(purl, { headers: { Authorization: us.token } })
          .toPromise();
        pro.catch(() => {});
      })
      .catch(() => {
        this.goLogin();
      });
  }

  bindAP(mac, success, fail) {
    this.store
      .get("user")
      .then((us: UserStore) => {
        let purl = `${BASEURL}ext/v1/users/bind_ap?apMacAddress=${mac}`;
        let pro = this.http
          .post(purl, null, { headers: { Authorization: us.token } })
          .toPromise();
        pro
          .then(() => {
            success();
          })
          .catch(() => {
            fail();
          });
      })
      .catch(() => {
        this.goLogin();
      });
  }

  getOverview(success, fail) {
    this.store
      .get("user")
      .then((us: UserStore) => {
        let purl = `${BASEURL}ext/v1/ap/overview?apMacAddr=${us.apmac}`;
        let pro = this.http
          .get(purl, { headers: { Authorization: us.token } })
          .toPromise();
        pro
          .then(res => {
            success(res);
          })
          .catch(() => {
            fail();
          });
      })
      .catch(() => {
        this.goLogin();
      });
  }
}
