import { Pipe, PipeTransform } from '@angular/core';

function timeago(differtime: number, args: number = 5): string {
  const currentYear: number = new Date().getFullYear(); // 获取当前的年份

  // 不靠谱的时间戳映射
  const TimetoSecond: any = {
    year: new Date(`${currentYear}`).getTime() / 1000,
    month: 30 * 86400,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  if (differtime >= TimetoSecond.year) {
    return parseInt(`${differtime / TimetoSecond.year}`, 10) + "年前";
  }
  if (differtime >= TimetoSecond.month) {
    return parseInt(`${differtime / TimetoSecond.month}`, 10) + "月前";
  }
  if (differtime >= TimetoSecond.day) {
    return parseInt(`${differtime / TimetoSecond.day}`, 10) + "天前";
  }
  if (differtime >= TimetoSecond.hour) {
    return parseInt(`${differtime / TimetoSecond.hour}`, 10) + "小时前";
  }
  if (differtime >= TimetoSecond.minute) {
    return parseInt(`${differtime / TimetoSecond.minute}`, 10) + "分钟前";
  }
  if (differtime < args) {
    return "片刻之前";
  } else {
    return parseInt(`${differtime}`, 10) + "秒前";
  }
}

/**
 * Generated class for the StimeagoPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'stimeago',
})
export class StimeagoPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string | number, ...args) {
    
    // 获取今天的时间戳,并得到秒数
    const currentTimeStamp: number = new Date().getTime();
    
    if (value) {
      let paramTimestamp: number = 0; //传入的时间戳
      if (typeof value === "string") {
        paramTimestamp = new Date(`${value}`).getTime();
        if (Number.isNaN(paramTimestamp)) return null;
      }
      if (typeof value === "number") {
        paramTimestamp = new Date(value).getTime();
      }
      const DifferTime = (new Date().getTime() - paramTimestamp) / 1000;
      return timeago(DifferTime, ...args);
    } else {
      // 否则则返回原值
      return null;
    }

  }
}
