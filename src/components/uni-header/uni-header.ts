import { Component,Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from 'ionic-angular';

/**
 * Generated class for the UniHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'uni-header',
  templateUrl: 'uni-header.html'
})
export class UniHeaderComponent {

  @Input()
  title: string = '首页';
  @Input()
  showmes: boolean = false;
  @Input()
  mestitle:string = '';
  @Input()
  showmodal:boolean = false;

  @Output()
  clkRight:EventEmitter<any> = new EventEmitter<any>();
  @Output()
  clkBack:EventEmitter<any> = new EventEmitter<any>();

  constructor(private modalCtrl:ModalController) {
  }

  clickRg(){
    this.clkRight.emit('');
  }

  closeModal(){
    this.clkBack.emit('');
  }

}
