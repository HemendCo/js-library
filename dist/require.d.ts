export {};
declare global {
    interface Object {
        clone(): Object;
    }
    interface Array<T> {
        includes(elem: T): boolean;
        contains(elem: T): boolean;
        includesAny(elem: Array<T>): boolean;
        containsAny(elem: Array<T>): boolean;
        remove(elem: T): T;
        shuffle(): Array<T>;
        unique(): Array<T>;
        clone(): Array<T>;
    }
    interface String {
        toEnNumbers(): string;
        numberFormat(decimals: number, dec_point?: string, thousands_sep?: string): string;
        isNumeric(): boolean;
        ucfirst(): string;
        lcfirst(): string;
        ucwords(): string;
        sprintf(...args: any[]): string;
        trim(s?: string | undefined): string;
        lrtrim(s?: string | undefined): string;
        rtrim(s?: string | undefined): string;
        ltrim(s?: string | undefined): string;
    }
    interface Number {
        numberFormat(decimals: number, dec_point?: string, thousands_sep?: string): string;
        isNumeric(): boolean;
        formatBytes(decimals?: number): string;
    }
}
