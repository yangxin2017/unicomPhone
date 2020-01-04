import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DeviceTypeInfoPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'deviceTypeInfo',
})
export class DeviceTypeInfoPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string , ...args) {
    switch(value){
      case '0': return '其他';
      case '1': return '手机';
      case '2': return '平板';
      case '3': return '电脑';
      default: return '未知';
  } 
  }
}
