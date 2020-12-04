interface Pagination {
    state: {
        curPage: number,
        totalPageCount: number,
        container: string,
        maxShowBtnCount: number,
        allPageClassName: string,
        activeClassName: string,
        dataNumberAttr: string,
        prevClassName: string,
        nextClassName: string,
        disableNextClassName: string,
        disablePrevClassName: string,
        pageNumberClassName: string,
        switchEvent: string,
        onPageChange: Function,
        activePosition: number
    }
}

class Pagination {
    constructor (totalPageCount: number) {
        if(!totalPageCount) return 

        this.state = {
            curPage: 1,
            totalPageCount,
            container: undefined,
            maxShowBtnCount: undefined,
            allPageClassName: undefined,
            activeClassName: undefined,
            dataNumberAttr: undefined,
            prevClassName: undefined,
            nextClassName: undefined,
            disableNextClassName: undefined,
            disablePrevClassName: undefined,
            pageNumberClassName: undefined,
            switchEvent: undefined,
            onPageChange: undefined,
            activePosition: undefined,
        }
    }

    init(paramsObj) {
        let state = this.state;
        state.container = paramsObj.container || 'body';
        state.maxShowBtnCount = paramsObj.maxShowBtnCount || 5;
        state.allPageClassName = paramsObj.allPageClassName || 'page-li';
        state.activeClassName = paramsObj.activeClassName || 'page-active';
        state.dataNumberAttr = paramsObj.dateNumberAttr || 'data-number';
        state.prevClassName = paramsObj.prevClassName || 'page-prev',
        state.nextClassName = paramsObj.nextClassName || 'page-next',
        state.disableNextClassName = paramsObj.disableNextClassName || 'no-next',
        state.disablePrevClassName = paramsObj.disablePrevClassName || 'no-prev',
        state.pageNumberClassName = paramsObj.pageNumberClassName || 'page-number',
        state.switchEvent = paramsObj.switchEvent || 'click',
        state.onPageChange = paramsObj.onPageChange
        state.totalPageCount > state.maxShowBtnCount + 2 && (state.activePosition = Math.ceil(state.maxShowBtnCount / 2));
        this.render()
    }

    render() {
        let state = this.state;
        let container = this.getElement(state.container) as HTMLElement;
        if(!container) return ;
        let { 
            totalPageCount, 
            allPageClassName, 
            prevClassName, 
            disablePrevClassName, 
            disableNextClassName, 
            pageNumberClassName,
            activeClassName,
            dataNumberAttr,
            maxShowBtnCount,
            nextClassName
        } = state
        let paginationStr = `
            <ul class='pagination'>
                <li class="${allPageClassName} ${prevClassName} ${disablePrevClassName}">上一页</li>
                <li class="${allPageClassName} ${pageNumberClassName} ${activeClassName}" ${dataNumberAttr}='1'>1</li>
        `
        if(totalPageCount - 2 > maxShowBtnCount) {
            paginationStr += ` 
                <li class="${allPageClassName} number-ellipsis ellipsis-head" style="display: none;">...</li>
            `
            for(let i = 2; i < maxShowBtnCount + 2; i++) {
                paginationStr += `
                    <li class="${allPageClassName} ${pageNumberClassName}" ${dataNumberAttr}='${i}'>${i}</li>
                `
            }
            paginationStr += `
                <li class="${allPageClassName} number-ellipsis ellipsis-tail">...</li>
                <li class="${allPageClassName} ${pageNumberClassName}" ${dataNumberAttr}='${totalPageCount}'>${totalPageCount}</li>
            `
        } else {
            for(let i = 2; i < totalPageCount + 1; i++) {
                paginationStr += `
                    <li class="${allPageClassName} ${pageNumberClassName}" ${dataNumberAttr}='${i}'>${i}</li>
                `
            }
        }
        paginationStr += `
            <li class="${allPageClassName} ${nextClassName} ${totalPageCount === 1 ? disableNextClassName : ''}">下一页</li></ul>
        `
        container.innerHTML = paginationStr;
        this.initEvent();
    }

    getElement(selector: string, all: boolean = false) {
        return all ? document.querySelectorAll(selector) as NodeListOf<HTMLElement> : document.querySelector(selector) as HTMLElement;
    }

    initEvent() {
        let state = this.state;
        let pageClassNameList = this.getElement('.' + state.allPageClassName, true) as NodeListOf<HTMLElement>
        let pageNumber: number
        pageClassNameList.forEach((item) => {
            item.addEventListener(state.switchEvent, (e) => {
                
                const currentPageEle = e.target as HTMLElement;
                const curPClassList = currentPageEle.classList;

                if (curPClassList.contains(state.activeClassName))  return;
                let dataNumberAttr = currentPageEle.getAttribute(state.dataNumberAttr);
                if(dataNumberAttr) {
                    pageNumber = +dataNumberAttr;
                } else if (curPClassList.contains(state.prevClassName)) {
                    state.curPage > 1 && (pageNumber = state.curPage - 1);
                } else if (curPClassList.contains(state.nextClassName)) {
                    state.curPage < state.totalPageCount && (pageNumber = state.curPage + 1);
                }

                pageNumber &&  this.gotoPage(pageNumber)
            })
        })
    }

    gotoPage(pageNumber: number) {
        let state = this.state;
        let allNumberPageLi = this.getElement(`.${state.pageNumberClassName}`, true) as NodeListOf<HTMLElement>;
        let len = allNumberPageLi.length;
        if(!len || this.isIllegal(pageNumber)) return 
        // 清除活跃
        const activeEle = this.getElement(`.${state.pageNumberClassName}.${state.activeClassName}`) as HTMLElement;
        activeEle.classList.remove(state.activeClassName);
        if(state.activePosition) {
            let rightEllipse = state.totalPageCount - (state.maxShowBtnCount - state.activePosition) - 1;

            if(pageNumber <= state.maxShowBtnCount && (pageNumber < rightEllipse)) {
                if(+allNumberPageLi[1].getAttribute(state.dataNumberAttr) > 2) {
                    for(let i = 1; i < state.maxShowBtnCount + 1; i++) {
                        const inner = String(i + 1);
                        allNumberPageLi[i].innerText = inner;
                        allNumberPageLi[i].setAttribute(state.dataNumberAttr, inner);
                    }
                }
                this.hiddenEle(`.ellipsis-head`)
                this.hiddenEle(`.ellipsis-tail`, false)
                allNumberPageLi[pageNumber - 1].classList.add(state.activeClassName);
            }

            if(pageNumber > state.maxShowBtnCount && pageNumber < rightEllipse) {
                this.hiddenEle('.ellipsis-head', false);
                this.hiddenEle('.ellipsis-tail', false);
                for(let i = 1; i < state.maxShowBtnCount + 1; i++) {
                    const inner = '' + (pageNumber + (i - state.activePosition));
                    allNumberPageLi[i].innerText = inner;
                    allNumberPageLi[i].setAttribute(state.dataNumberAttr, inner);
                }
                allNumberPageLi[state.activePosition].classList.add(state.activeClassName);
            }

            if(pageNumber >= rightEllipse) {
                this.hiddenEle('.ellipsis-tail');
                this.hiddenEle('.ellipsis-head', false);
                if(+allNumberPageLi[len - 2].getAttribute(state.dataNumberAttr) < state.totalPageCount - 1) {
                    for(let i = 1; i < state.maxShowBtnCount + 1; i++) {
                        const inner = '' + (state.totalPageCount - state.maxShowBtnCount + i - 1);
                        allNumberPageLi[i].innerText = inner;
                        allNumberPageLi[i].setAttribute(state.dataNumberAttr, inner);
                    }
                }
                const activeIndex =  state.maxShowBtnCount + 1 - (state.totalPageCount - pageNumber)
                allNumberPageLi[activeIndex].classList.add(state.activeClassName);
            }
        } else {
            allNumberPageLi[pageNumber - 1].classList.add(state.activeClassName);
        }

        state.curPage = pageNumber;
        this.prevNextAble()
        state.onPageChange && state.onPageChange(state);
    }

    isIllegal(pageNumber: number) {
        let state = this.state;
        const { curPage, totalPageCount } = state;
        /**
         * 是否现在与需要跳转的页面一样
         * 检测是否是Number
         * 提除NaN
         * 剔除小数
         * 检查是否在 1-总页数之间
         */
        return (
            curPage === pageNumber || 
            Math.ceil(pageNumber) !== pageNumber ||
            pageNumber > totalPageCount ||
            pageNumber < 1 ||
            typeof pageNumber !== 'number' ||
            pageNumber !== pageNumber
        )

    }

    hiddenEle(selector: string, hidden = true) {
        (this.getElement(selector) as HTMLElement).style.display = hidden ? 'none' : ''
    }

    prevNextAble() {
        let state = this.state;
        let prevBtnClassList = (this.getElement(`.${state.prevClassName}`) as HTMLElement).classList;
        let nextBtnClassList = (this.getElement(`.${state.nextClassName}`) as HTMLElement).classList;
        
        state.curPage === 1 ? prevBtnClassList.add(state.disablePrevClassName) : prevBtnClassList.remove(state.disablePrevClassName);
        state.curPage === state.totalPageCount ? nextBtnClassList.add(state.disableNextClassName) : nextBtnClassList.remove(state.disableNextClassName) 
    }
}