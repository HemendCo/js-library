import { PageTitleNotificationInterface, PagerInterface } from './interface';
export { default as storage } from './storage';
export { default as storageBridge } from './storageBridge';
export declare function extend(...args: {
    [key: string]: any;
}[]): {
    [key: string]: any;
};
export declare const PageTitleNotification: PageTitleNotificationInterface;
export declare function capitalizeFirstLetter(str: string): string;
/**
 *
 * @param {Array<string>} arr
 * @returns
 */
export declare function removeDuplicatesSafe(arr: Array<string>): Array<string>;
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
/**
 *
 * @param totalItems
 * @param currentPage
 * @param pageSize
 * @param maxPages
 * @returns
 */
export declare function paginate(totalItems: number, currentPage: number, pageSize: number, maxPages: number): PagerInterface;
