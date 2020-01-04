import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name:'deviceType'})
export class DeviceTypeInfoPipe implements PipeTransform {
  transform(value: string): string {
    console.log("DeviceTypeInfoPipe the value is:" + value);
    switch(value){
        case '0': return '其他';
        case '1': return '手机';
        case '2': return '平板';
        case '3': return '电脑';
        default: return '未知';
    } 
  }
}