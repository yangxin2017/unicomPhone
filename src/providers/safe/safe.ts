import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASEURL } from '../common';

import { Storage } from '@ionic/storage';
import { NavController, ModalController } from 'ionic-angular';
import { UserStore } from '../../pages/user.storage';
import { DataStore } from '../../pages/data.storage';

/*
  Generated class for the SafeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SafeProvider {

  constructor(public http: HttpClient, private store:Storage, private ctrl:NavController, private modalCtrl:ModalController) {
  }

  checkStorage(callback){
    this.store.get('user').then((val:UserStore)=>{
      this.getDataStore((dt)=>{
        callback(val, dt);
      })
    }).catch((err)=>{
        this.goLogin();
    });
  }

  getDataStore(callback){
    this.store.get('datas').then((d: DataStore)=>{
      callback(d);
    }).catch((err)=>{
        this.goLogin();
    });
  }

  goLogin(){
    //this.ctrl.setRoot('Err500Page');
    const modal = this.modalCtrl.create('Err500Page');
    modal.present();
  }

  getList(pagenum, pagesize, stime, etime, success){
    this.checkStorage((us:UserStore, dt:DataStore)=>{
      
      console.log(dt);

      if(dt && dt.safeData && dt.safeData.result.length > 0){
        success(dt.safeData);

        let purl = `${BASEURL}alert/v1/alerts?apMacAddr=${us.apmac}`;
        let pro = this.http.get(purl, {headers: {Authorization: us.token}}).toPromise();
        pro.then((res:any)=>{
          
          if(dt == null){
            dt = new DataStore();
          }
          dt.safeData = res;
          this.store.set('datas', dt);

          //success(res);
        }).catch(()=>{
          this.goLogin();
        });

      }else{
        let purl = `${BASEURL}alert/v1/alerts?apMacAddr=${us.apmac}`;
        let pro = this.http.get(purl, {headers: {Authorization: us.token}}).toPromise();
        pro.then((res:any)=>{
          
          if(dt == null){
            dt = new DataStore();
          }
          dt.safeData = res;
          this.store.set('datas', dt);

          success(res);
        }).catch(()=>{
          this.goLogin();
        });
      }
      
    });
  }

  startScan(success){
    this.checkStorage((us:UserStore)=>{
      let purl = `${BASEURL}ext/v1/ap/batch_scan?apMac=${us.apmac}`;
      let pro = this.http.get(purl, {headers: {Authorization: us.token}}).toPromise();
      pro.then((res:any)=>{
        success(res);
      }).catch((err)=>{
        this.goLogin();
      });
    });
  }
  checkScan(success){
    this.checkStorage((us:UserStore)=>{
      let purl = `${BASEURL}ext/v1/ap/query_ap_scan?apMac=${us.apmac}`;
      let pro = this.http.get(purl, {headers: {Authorization: us.token}}).toPromise();
      pro.then((res:any)=>{
        success(res);
      }).catch(()=>{
        this.goLogin();
      });
    });
  }

}
