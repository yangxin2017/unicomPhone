import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserStore } from '../../pages/user.storage';
import { ChangeDetectorRef } from '@angular/core';

/**
 * Generated class for the TabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab',
  templateUrl: 'tab.html',
})
export class TabPage {

  tab1Root:any = 'MainPage';
  tab2Root:any = 'EquipPage';
  tab3Root:any = 'SafePage';
  tab4Root:any = 'MinePage';

  isRegisted:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public store: Storage, public cd: ChangeDetectorRef) {
  }

  ionViewDidLoad() {
    setTimeout(()=>{
      this.store.get('user').then((us:UserStore)=>{
        this.isRegisted = us.isBindRouter;
      });
    }, 500);
  }

}
