export interface PageTitleNotificationInterface {
    vars: {
        originalTitle: string;
        interval: ReturnType<typeof setInterval> | null;
    };
    On(notification: string, intervalSpeed: number): void;
    Off(): void;
}
export declare type PagerInterface = {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    startPage: number;
    endPage: number;
    startIndex: number;
    endIndex: number;
    pages: number[];
};
export declare type StorageInterface = {
    prefix: string;
};
