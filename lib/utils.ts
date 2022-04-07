import { PageTitleNotificationInterface,  PagerInterface } from "./interface";

export const PageTitleNotification: PageTitleNotificationInterface = {
    vars: {
        originalTitle : typeof document !== 'undefined' ?  document?.title : '',
        interval : null
    },
    On: function(notification: string, intervalSpeed: number) {
        if(document.title) {
            this.vars.interval = setInterval(
            () => {
                document.title = (this.vars.originalTitle == document.title) ? notification : this.vars.originalTitle;
            }, (intervalSpeed) ? intervalSpeed : 1000);
        }
    },
    Off: function() {
        if(this.vars.interval) {
            clearInterval(this.vars.interval);
        }
        if(document.title) {
            document.title = this.vars.originalTitle;
        }
    }
}
  
/**
 * 
 * @param {Array<string>} arr 
 * @returns 
 */
export function removeDuplicatesSafe(arr: Array<string>) : Array<string> {
    let seen: {[key: string]: boolean} = {};
    let ret_arr = [];
    for (let i = 0; i < arr.length; i++) {
        if (!(arr[i] in seen)) {
            ret_arr.push(arr[i]);
            seen[arr[i]] = true;
        }
    }
    return ret_arr;
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
export const separatorBeforeCapitalLetters = function (string: string, separator: string) : string {
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
export const capitalLettersAndRemoveSeperator = function (string: string, separator: string) : string {
    separator = separator ?? ' ';
    return string.replace(new RegExp('(^|'+separator+').','g'), s => s.slice(-1).toUpperCase());
}

/**
 * 
 * @param number 
 * @param targetLength 
 * @returns 
 */
export const leftPad = function (number: number, targetLength: number) : string {
    let output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}


/**
 * 
 * @param totalItems 
 * @param currentPage 
 * @param pageSize 
 * @param maxPages 
 * @returns 
 */
export const paginate = function(totalItems: number, currentPage: number, pageSize: number, maxPages: number) : PagerInterface {
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