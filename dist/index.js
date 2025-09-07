export * from './array';
export * from './number';
export * from './string';
export { default as countDownTimer } from './countDownTimer';
export { default as storage } from './storage';
export { default as storageBridge } from './storageBridge';
export function extend(...args) {
    let o = {};
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
export const PageTitleNotification = {
    vars: {
        originalTitle: typeof document !== 'undefined' ? document === null || document === void 0 ? void 0 : document.title : '',
        interval: null
    },
    On: function (notification, intervalSpeed) {
        if (typeof document !== 'undefined') {
            this.vars.interval = setInterval(() => {
                document.title = (this.vars.originalTitle == document.title) ? notification : this.vars.originalTitle;
            }, (intervalSpeed) ? intervalSpeed : 1000);
        }
    },
    Off: function () {
        if (this.vars.interval) {
            clearInterval(this.vars.interval);
        }
        if (typeof document !== 'undefined') {
            document.title = this.vars.originalTitle;
        }
    }
};
/**
 *
 * @param {string} key
 * @param {any} val
 * @param {Array<any>} params
 * @returns
 */
export function findIndexInArrayObject(key, val, params) {
    for (let i in params) {
        let p = params[i];
        if (p[key] === val) {
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
export function separatorBeforeCapitalLetters(string, separator) {
    separator = separator !== null && separator !== void 0 ? separator : ' ';
    string = string.replace(/([a-z])([A-Z])/g, '$1' + separator + '$2');
    string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1' + separator + '$2');
    return string;
}
/**
 *
 * @param string
 * @param separator
 * @returns
 */
export function capitalLettersAndRemoveSeperator(string, separator) {
    separator = separator !== null && separator !== void 0 ? separator : ' ';
    return string.replace(new RegExp('(^|' + separator + ').', 'g'), s => s.slice(-1).toUpperCase());
}
/**
 *
 * @param number
 * @param targetLength
 * @returns
 */
export function leftPad(number, targetLength) {
    let output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}
export const randomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const randomNumber = function (min, max) {
    return Math.random() * (max - min) + min;
};
export const randomBetween = function (min, max, interval) {
    if (typeof interval === 'undefined') {
        interval = 1;
    }
    let r = Math.floor(Math.random() * (max - min + interval) / interval);
    return r * interval + min;
};
/**
 *
 * @param totalItems
 * @param currentPage
 * @param pageSize
 * @param maxPages
 * @returns
 */
export function paginate(totalItems, currentPage, pageSize, maxPages) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);
    // ensure current page isn't out of range
    if (currentPage < 1) {
        currentPage = 1;
    }
    else if (currentPage > totalPages) {
        currentPage = totalPages;
    }
    let startPage, endPage;
    if (totalPages <= maxPages) {
        // total pages less than max so show all pages
        startPage = 1;
        endPage = totalPages;
    }
    else {
        // total pages more than max so calculate start and end pages
        let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
        let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
        if (currentPage <= maxPagesBeforeCurrentPage) {
            // current page near the start
            startPage = 1;
            endPage = maxPages;
        }
        else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
            // current page near the end
            startPage = totalPages - maxPages + 1;
            endPage = totalPages;
        }
        else {
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
    const pager = {
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
