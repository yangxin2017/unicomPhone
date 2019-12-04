import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';

import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserStore } from '../user.storage';

import { JpushsProvider } from '../../providers/jpushs/jpushs';
/**
 * Generated class for the RegistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-regist',
  templateUrl: 'regist.html',
  providers: [UserProvider]
})
export class RegistPage {
  
  registmethod:string = 'normal';

  public form:FormGroup;
  public name:AbstractControl;
  public password:AbstractControl;
  public confirmPassword:AbstractControl;

  phonenumber:string = '';
  phonepassword:string = '';
  isEnableSend:boolean = true;
  isValidPhone:boolean = true;
  lastsecond:number = 0;
  intervalphone:any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    fb:FormBuilder,
    public loadingCtrl: LoadingController,
    private serv:UserProvider,
    private alertCtrl:AlertController,
    private app:App,
    private storage: Storage, 
    private jpush: JpushsProvider
  ) {
    this.form = fb.group({
        name: ['', Validators.compose([Validators.required])],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
    },{validator: matchingPasswords('password', 'confirmPassword')});

    this.name = this.form.controls['name'];
    this.password = this.form.controls['password'];
    this.confirmPassword = this.form.controls['confirmPassword'];
  }

  ionViewDidLoad() {
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  registPhone(){
    this.serv.registPhone(this.phonenumber, this.phonepassword).then((val)=>{
      const alert = this.alertCtrl.create({
        title: '注册成功!',
        subTitle: '',
        buttons: [{
          text: '确定',
          handler: ()=>{
            this.viewCtrl.dismiss();
            //LOGIN
            this.saveInfor(val);
          }
        }]
      });
      alert.present();
    }).catch((err:any)=>{
      const alert = this.alertCtrl.create({
        title: '验证失败!',
        subTitle: err.error.msg,
        buttons: ['确定']
      });
      alert.present();
    });
  }

  saveInfor(val){
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

      let loader = this.loadingCtrl.create({
        content: "登录中...",
      });
      loader.present();
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
        
        this.storage.set('user', us);

        setTimeout(()=>{
          loader.dismiss();
          this.viewCtrl.dismiss();
          
          this.app.getRootNav().setRoot('TabPage');

          this.jpush.initJPUSH(us);
          
        }, 500);
        

      });

    //});
  }

  checkisphone(val){
    var phoneRegexp = /^1[3|4|5|7|8|9][0-9]{9}$/;    
    if (!phoneRegexp.test(val)) {
        return false;
    }
    return true;
  }

  getVerifynum(){
    if(this.checkisphone(this.phonenumber)){
      this.isValidPhone = true;
      this.isEnableSend = false;

      this.serv.sendVerifynum(this.phonenumber);
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

}

export function emailValidator(control: FormControl): {[key: string]: any} {
  var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;    
  if (control.value && !emailRegexp.test(control.value)) {
      return {invalidEmail: true};
  }
}
//
export function phoneValidator(control: FormControl): {[key: string]: any} {
  var phoneRegexp = /^1[3|4|5|7|8][0-9]{9}$/;    
  if (control.value && !phoneRegexp.test(control.value)) {
      return {invalidPhone: true};
  }
}

export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
  return (group: FormGroup) => {
      let password= group.controls[passwordKey];
      let passwordConfirmation= group.controls[passwordConfirmationKey];
      if (password.value !== passwordConfirmation.value) {
          return passwordConfirmation.setErrors({mismatchedPasswords: true})
      }
  }
}
