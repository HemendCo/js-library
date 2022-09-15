import { PageTitleNotificationInterface,  PagerInterface } from './interface';

export { default as countDownTimer } from './countDownTimer';
export { default as storage } from './storage';
export { default as storageBridge } from './storageBridge';

export function extend(...args: {[key: string]: any}[]) {
  let o: {[key: string]: any} = {};

  for (let i = 0; i < args.length; i++) {
    // Uncomment to skip args that are not objects (to prevent errors)
    // if (args[i].constructor !== Object) continue;
    for (let k in args[i]) {
      if (args[i].hasOwnProperty(k)) {
        o[k] = args[i][k].constructor === Object
          ? extend(o[k] || {}, args[i][k])
          : args[i][k];
      }
    }
  }

  return o;
}

export const PageTitleNotification: PageTitleNotificationInterface = {
  vars: {
    originalTitle : typeof document !== 'undefined' ?  document?.title : '',
    interval : null
  },
  On: function(notification: string, intervalSpeed: number) {
    if(typeof document !== 'undefined') {
      this.vars.interval = setInterval(
      () => {
        document!.title = (this.vars.originalTitle == document.title) ? notification : this.vars.originalTitle;
      }, (intervalSpeed) ? intervalSpeed : 1000);
    }
  },
  Off: function() {
    if(this.vars.interval) {
      clearInterval(this.vars.interval);
    }
    if(typeof document !== 'undefined') {
      document!.title = this.vars.originalTitle;
    }
  }
}

/**
 * 
 * @param {string} key 
 * @param {any} val 
 * @param {Array<any>} params 
 * @returns 
 */
export function findIndexInArrayObject(key: string, val: any, params: Array<any>) {
  for(let i in params) {
    let p = params[i];
    if(p[key] === val) {
      return i;
    }
  }
  return undefined;
}

/**
 * @param {string} string 
 * @param {string} [separator] 
 * @returns 
 */
export function separatorBeforeCapitalLetters(string: string, separator: string) : string {
  separator = separator ?? ' ';
  string = string.replace(/([a-z])([A-Z])/g, '$1'+separator+'$2');
  string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1'+separator+'$2')
  return string;
}

/**
 * 
 * @param string 
 * @param separator 
 * @returns 
 */
export function capitalLettersAndRemoveSeperator(string: string, separator: string) : string {
  separator = separator ?? ' ';
  return string.replace(new RegExp('(^|'+separator+').','g'), s => s.slice(-1).toUpperCase());
}

/**
 * 
 * @param number 
 * @param targetLength 
 * @returns 
 */
export function leftPad(number: number, targetLength: number) : string {
  let output = number + '';
  while (output.length < targetLength) {
    output = '0' + output;
  }
  return output;
}

export const randomInteger = function(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const randomNumber = function(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const randomBetween = function(min: number, max: number, interval: number) {
	if (typeof interval === 'undefined') {
		interval = 1;
	}

  let r = Math.floor(Math.random() * (max - min + interval) / interval);

	return r * interval + min;
}

export const sprintf = function(str: string) {
  let args: {[key: number]: number|string} = arguments;
  delete args[0];
  let params = [];
  for (let i in args) {
    params.push(args[i])
  }

  // @ts-ignore
  return String.prototype.sprintf.apply(str, params);
}

export enum SizeUnits {
  Bytes = 'Bytes',
  KB = 'KB',
  MB = 'MB',
  GB = 'GB',
  TB = 'TB',
  PB = 'PB',
  EB = 'EB',
  ZB = 'ZB',
  YB = 'YB'
}

export const formatBytes = function(bytes: number, decimals: number = 2) {
  if(bytes == 0) return '0 B';
  decimals = decimals === undefined ? 2 : decimals
  let k = 1024; //Or 1 kilo = 1000
  let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

/**
 * 
 * @param totalItems 
 * @param currentPage 
 * @param pageSize 
 * @param maxPages 
 * @returns 
 */
export function paginate(totalItems: number, currentPage: number, pageSize: number, maxPages: number) : PagerInterface {
  // calculate total pages
  let totalPages = Math.ceil(totalItems / pageSize);

  // ensure current page isn't out of range
  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  let startPage: number, endPage: number;
  if (totalPages <= maxPages) {
    // total pages less than max so show all pages
    startPage = 1;
    endPage = totalPages;
  } else {
    // total pages more than max so calculate start and end pages
    let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
    let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
    if (currentPage <= maxPagesBeforeCurrentPage) {
      // current page near the start
      startPage = 1;
      endPage = maxPages;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      // current page near the end
      startPage = totalPages - maxPages + 1;
      endPage = totalPages;
    } else {
      // current page somewhere in the middle
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  // calculate start and end item indexes
  let startIndex = (currentPage - 1) * pageSize;
  let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  // create an array of pages to ng-repeat in the pager control
  let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

  const pager: PagerInterface = {
    totalItems: totalItems,
    currentPage: currentPage,
    pageSize: pageSize,
    totalPages: totalPages,
    startPage: startPage,
    endPage: endPage,
    startIndex: startIndex,
    endIndex: endIndex,
    pages: pages
  };

  // return object with all pager properties required by the view
  return pager;
}