
export interface PageTitleNotificationInterface {
    vars: {
        originalTitle: string;
        interval: number|null;
    };
    On(notification: string, intervalSpeed: number) : void;
    Off() : void;
}

export type PagerInterface = {
    totalItems: number,
    currentPage: number,
    pageSize: number,
    totalPages: number,
    startPage: number,
    endPage: number,
    startIndex: number,
    endIndex: number,
    pages: number[]
}