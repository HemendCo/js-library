export {};
declare global {
    interface Object {
        clone(): Object;
    }
    interface Array<T> {
        includes(elem: T): boolean;
        contains(elem: T): boolean;
        remove(elem: T): T;
        shuffle(): Array<T>;
        unique(): Array<T>;
        clone(): Array<T>;
    }
    interface String {
        toEnNumbers(): string;
        numberFormat(decimals: number, dec_point: string, thousands_sep: string): string;
        isNumeric(): boolean;
        ucfirst(): string;
        lcfirst(): string;
        ucwords(): string;
        sprintf(): string;
        trim(): string;
        lrtrim(): string;
        rtrim(): string;
        ltrim(): string;
    }
    interface Number {
        numberFormat(decimals: number, dec_point: string, thousands_sep: string): string;
        isNumeric(): boolean;
    }
}
