interface Pagination {
    state: {
        curPage: number;
        totalPageCount: number;
        container: string;
        maxShowBtnCount: number;
        allPageClassName: string;
        activeClassName: string;
        dataNumberAttr: string;
        prevClassName: string;
        nextClassName: string;
        disableNextClassName: string;
        disablePrevClassName: string;
        pageNumberClassName: string;
        switchEvent: string;
        onPageChange: Function;
        activePosition: number;
    };
}
declare class Pagination {
    constructor(totalPageCount: number);
    init(paramsObj: any): void;
    render(): void;
    getElement(selector: string, all?: boolean): HTMLElement | NodeListOf<HTMLElement>;
    initEvent(): void;
    gotoPage(pageNumber: number): void;
    isIllegal(pageNumber: number): boolean;
    hiddenEle(selector: string, hidden?: boolean): void;
    prevNextAble(): void;
}
