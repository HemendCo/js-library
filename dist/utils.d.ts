import { PageTitleNotificationInterface, PagerInterface } from "./interface";
export declare const PageTitleNotification: PageTitleNotificationInterface;
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
export declare const separatorBeforeCapitalLetters: (string: string, separator: string) => string;
/**
 *
 * @param string
 * @param separator
 * @returns
 */
export declare const capitalLettersAndRemoveSeperator: (string: string, separator: string) => string;
/**
 *
 * @param number
 * @param targetLength
 * @returns
 */
export declare const leftPad: (number: number, targetLength: number) => string;
/**
 *
 * @param totalItems
 * @param currentPage
 * @param pageSize
 * @param maxPages
 * @returns
 */
export declare const paginate: (totalItems: number, currentPage: number, pageSize: number, maxPages: number) => PagerInterface;
