import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'devicetype',
})
export class DeviceTypeInfoPipe implements PipeTransform {

  transform(value: string | number, ...args) {
    if(!value){
    console.log("DeviceTypeInfoPipe not contain value" );
    return "demo"
    }
    
    switch(value){
        case 0: return '其他';
        case 1: return '手机';
        case 2: return '平板';
        case 3: return '电脑';
        default: return '未知';
    } 
  }
}