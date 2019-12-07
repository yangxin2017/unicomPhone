import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASEURL } from '../common';

import { Storage } from '@ionic/storage';
import { NavController, ModalController } from 'ionic-angular';
import { UserStore } from '../../pages/user.storage';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider{


  constructor(public http: HttpClient, private store:Storage, private ctrl:NavController, private modalCtrl:ModalController) {
  }

  ssologin(p, sign){
    let url = `${BASEURL}/ext/v1/users/get_sso_token?p=${p}&sign=${sign}`;
    return this.http.post(url, null).toPromise();
  }

  checkStorage(callback, errorback){
    this.store.get('user').then((val:UserStore)=>{
        callback(val);
    }).catch((err)=>{
        this.goLogin();
    });
  }

  login(email, pass){
    let param = {userId: email, password: pass};
    let purl = `${BASEURL}ext/v1/users/login?userId=${param.userId}&password=${param.password}&type=0`;
    return this.http.post(purl, null).toPromise();
  }

  goLogin(){
    //this.ctrl.setRoot('Err500Page');
    const modal = this.modalCtrl.create('Err500Page');
    modal.present();
  }

  getAps(token, success){
    let purl = `${BASEURL}ext/v1/users/query_bind_aps`;
    let pro = this.http.post(purl, null, {headers: {Authorization: token}}).toPromise();
    pro.then((res:any)=>{
      success(res);
    });
  }

  getUserinfo(email, token){
    let purl = `${BASEURL}ext/v1/users/fetch_user_by_id?userId=${email}`;
    return this.http.get(purl, {headers: {Authorization: token}}).toPromise();
  }

  sendVerifynum(phonenum){
    let purl = `${BASEURL}ext/v1/users/getVerificationCode?mobile=${phonenum}`;
    let pro = this.http.get(purl).toPromise();
    pro.catch(()=>{});
    return pro;
  }

  registPhone(phonenum, code){
    let purl = `${BASEURL}ext/v1/users/reg_mobile?mobile=${phonenum}&verificationCode=${code}`;
    return this.http.post(purl, null).toPromise();
  }

  loginPhone(phone, code){
    let param = {mobile: phone, verificationCode: code};
    let purl = `${BASEURL}ext/v1/users/login?mobile=${param.mobile}&verificationCode=${param.verificationCode}&type=1`;
    return this.http.post(purl, null).toPromise();
  }

}
