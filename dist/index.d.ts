import { PageTitleNotificationInterface, PagerInterface } from './interface';
export * from './array';
export * from './number';
export * from './string';
export { default as countDownTimer } from './countDownTimer';
export { default as storage } from './storage';
export { default as storageBridge } from './storageBridge';
export declare function extend(...args: {
    [key: string]: any;
}[]): {
    [key: string]: any;
};
export declare const PageTitleNotification: PageTitleNotificationInterface;
/**
 *
 * @param {string} key
 * @param {any} val
 * @param {Array<any>} params
 * @returns
 */
export declare function findIndexInArrayObject(key: string, val: any, params: Array<any>): string | undefined;
/**
 * @param {string} string
 * @param {string} [separator]
 * @returns
 */
export declare function separatorBeforeCapitalLetters(string: string, separator: string): string;
/**
 *
 * @param string
 * @param separator
 * @returns
 */
export declare function capitalLettersAndRemoveSeperator(string: string, separator: string): string;
/**
 *
 * @param number
 * @param targetLength
 * @returns
 */
export declare function leftPad(number: number, targetLength: number): string;
export declare const randomInteger: (min: number, max: number) => number;
export declare const randomNumber: (min: number, max: number) => number;
export declare const randomBetween: (min: number, max: number, interval: number) => number;
export declare const sprintf: (str: string) => any;
export declare enum SizeUnits {
    Bytes = "Bytes",
    KB = "KB",
    MB = "MB",
    GB = "GB",
    TB = "TB",
    PB = "PB",
    EB = "EB",
    ZB = "ZB",
    YB = "YB"
}
export declare const isObject: (o: any) => boolean;
/**
 *
 * @param totalItems
 * @param currentPage
 * @param pageSize
 * @param maxPages
 * @returns
 */
export declare function paginate(totalItems: number, currentPage: number, pageSize: number, maxPages: number): PagerInterface;
