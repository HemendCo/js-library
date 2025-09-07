export declare function numberFormat(value: number, decimals?: number, dec_point?: string, thousands_sep?: string): string;
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
export declare const formatBytes: (bytes: number, decimals?: number) => string;
