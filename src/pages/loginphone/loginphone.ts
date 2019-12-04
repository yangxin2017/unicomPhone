import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { UserStore } from '../user.storage';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginphonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loginphone',
  templateUrl: 'loginphone.html',
  providers: [UserProvider]
})
export class LoginphonePage {

  username:string = '';
  password:string = '';
  isEnableSend:boolean = true;
  lastsecond:number = 0;
  isValidPhone:boolean = true;
  intervalphone:any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    private serv:UserProvider,
    public alertCtrl: AlertController,
    private storage: Storage,
    private app:App
  ) {
    this.storage.get('login_phonenumber').then((uname:string)=>{
      this.username = uname;
    });
  }

  ionViewDidLoad() {
    
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  checkisphone(val){
    var phoneRegexp = /^1[3|4|5|7|8|9][0-9]{9}$/;    
    if (!phoneRegexp.test(val)) {
        return false;
    }
    return true;
  }

  getVerifynum(){
    if(this.checkisphone(this.username)){
      this.isValidPhone = true;
      this.isEnableSend = false;

      this.serv.sendVerifynum(this.username);
      this.lastsecond = 60;
      this.intervalphone = setInterval(()=>{
        this.lastsecond--;
        if(this.lastsecond <= 0){
          this.clearTime();
        }
      }, 1000);
    }else{
      this.isValidPhone = false;
    }
  }

  clearTime(){
    if(this.intervalphone){
      clearInterval(this.intervalphone);
    }
    this.isEnableSend = true;
  }

  ionViewDidLeave(){
    this.clearTime();
  }

  loginPhone(){
    let loader = this.loadingCtrl.create({
      content: "登录中...",
    });
    loader.present();
    let login = this.serv.loginPhone(this.username, this.password);
    login.then((val:any)=>{
      
      this.saveInfor(val, loader);

    }).catch((err)=>{

      loader.dismiss();
      const alert = this.alertCtrl.create({
        title: '登录失败!',
        subTitle: '请检查验证码是否正确!',
        buttons: ['确定']
      });
      alert.present();

      //this.username = '';
      this.password = '';

    });
  }

  saveInfor(val, loader){
    let token = val.token
    //this.serv.getUserinfo(this.username, token).then((val:any)=>{
      let us = new UserStore();
      us.apmac = val.apMacAddr;
      us.email = val.emailAddr;
      us.ip = val.ip;
      us.phoneNumber = val.phoneNumber;
      us.token = token;
      us.userId = val.userId;
      us.username = val.userId.split('@')[0];
      us.id = val.id;
      us.password = val.password;
      us.birth = val.birthday;
      us.verifynum = val.identity;
      us.wxcode = val.wx;
      us.kdcode = '';

      this.storage.set('login_phonenumber', val.phoneNumber);

      this.serv.getAps(token, (res:any)=>{
        let caches = [];
        for(let r of res){
          if(r.apMacAddr != ''){
            caches.push({apmac: r.apMacAddr, ip: r.innerIpShow, alias: r.alias});
          }
        }
        us.arrEquips = caches;

        if(us.arrEquips.length > 0){
          us.apmac = us.arrEquips[0].apmac;
          us.ip = us.arrEquips[0].ip;
          us.isBindRouter = true;
        }else{
          us.isBindRouter = false;
        }
        
        loader.dismiss();

        this.storage.set('user', us);
        this.viewCtrl.dismiss();
        
        this.app.getRootNav().setRoot('TabPage');

      });

    //});
  }

}
