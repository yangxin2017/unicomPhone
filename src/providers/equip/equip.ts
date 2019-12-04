import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASEURL } from '../common';

import { Storage } from '@ionic/storage';
import { NavController, ModalController } from 'ionic-angular';
import { UserStore } from '../../pages/user.storage';

/*
  Generated class for the EquipProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EquipProvider {

  constructor(public http: HttpClient, private store:Storage, private ctrl:NavController, private modalCtrl:ModalController) {
  }

  checkStorage(callback){
    this.store.get('user').then((val:UserStore)=>{
        callback(val);
    }).catch((err)=>{
        this.goLogin();
    });
  }

  goLogin(){
    const modal = this.modalCtrl.create('Err500Page');
    modal.present();
    //this.ctrl.setRoot('Err500Page');//Err500Page
  }

  getEquipPageData(pagenum, pagesize, success, fail){
    this.checkStorage((us:UserStore)=>{
      let purl = `${BASEURL}ext/v1/ap/overview?apMacAddr=${us.apmac}`;
      let pro = this.http.get(purl, {headers: {Authorization: us.token}}).toPromise();

      let purl2 = `${BASEURL}ext/v1/devices?apMacAddress=${us.apmac}&pageNum=${pagenum}&pageSize=${pagesize}`;
      let pro2 = this.http.get(purl2, {headers: {Authorization: us.token}}).toPromise();

      Promise.all([pro, pro2]).then((datas:any)=>{
        success(datas);
      }).catch((err:any)=>{
        fail();
        this.goLogin();
      });

    });
  }

  routerInfor(success){
    this.checkStorage((us:UserStore)=>{
      let purl = `${BASEURL}ext/v1/ap/overview?apMacAddr=${us.apmac}`;
      let pro = this.http.get(purl, {headers: {Authorization: us.token}}).toPromise();
      pro.then((res:any)=>{
        success(res);
      }).catch(()=>{
        this.goLogin();
      });
    });
  }

  getEquips(pagenum, pagesize, success, fail){
    this.checkStorage((us:UserStore)=>{
      let purl = `${BASEURL}ext/v1/devices?apMacAddress=${us.apmac}&pageNum=${pagenum}&pageSize=${pagesize}`;
      let pro = this.http.get(purl, {headers: {Authorization: us.token}}).toPromise();
      pro.then((res:any)=>{
        success(res);
      }).catch(()=>{
        fail();
        this.goLogin();
      });
    });
  }

  setEquipAuth(id, auth, success){
    this.checkStorage((us:UserStore)=>{
      let purl = `${BASEURL}ext/v1/devices/add_device_authority`;
      let pro = this.http.post(purl, {id: id, status: auth}, {headers: {Authorization: us.token}}).toPromise();
      pro.then((res:any)=>{
        success(res);
      }).catch(()=>{
        this.goLogin();
      });
    });
  }

}
