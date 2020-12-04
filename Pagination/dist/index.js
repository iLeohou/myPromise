var Pagination = (function () {
    function Pagination(totalPageCount) {
        if (!totalPageCount)
            return;
        this.state = {
            curPage: 1,
            totalPageCount: totalPageCount,
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
            activePosition: undefined
        };
    }
    Pagination.prototype.init = function (paramsObj) {
        var state = this.state;
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
            state.onPageChange = paramsObj.onPageChange;
        state.totalPageCount > state.maxShowBtnCount + 2 && (state.activePosition = Math.ceil(state.maxShowBtnCount / 2));
        this.render();
    };
    Pagination.prototype.render = function () {
        var state = this.state;
        var container = this.getElement(state.container);
        if (!container)
            return;
        var totalPageCount = state.totalPageCount, allPageClassName = state.allPageClassName, prevClassName = state.prevClassName, disablePrevClassName = state.disablePrevClassName, disableNextClassName = state.disableNextClassName, pageNumberClassName = state.pageNumberClassName, activeClassName = state.activeClassName, dataNumberAttr = state.dataNumberAttr, maxShowBtnCount = state.maxShowBtnCount, nextClassName = state.nextClassName;
        var paginationStr = "\n            <ul class='pagination'>\n                <li class=\"" + allPageClassName + " " + prevClassName + " " + disablePrevClassName + "\">\u4E0A\u4E00\u9875</li>\n                <li class=\"" + allPageClassName + " " + pageNumberClassName + " " + activeClassName + "\" " + dataNumberAttr + "='1'>1</li>\n        ";
        if (totalPageCount - 2 > maxShowBtnCount) {
            paginationStr += " \n                <li class=\"" + allPageClassName + " number-ellipsis ellipsis-head\" style=\"display: none;\">...</li>\n            ";
            for (var i = 2; i < maxShowBtnCount + 2; i++) {
                paginationStr += "\n                    <li class=\"" + allPageClassName + " " + pageNumberClassName + "\" " + dataNumberAttr + "='" + i + "'>" + i + "</li>\n                ";
            }
            paginationStr += "\n                <li class=\"" + allPageClassName + " number-ellipsis ellipsis-tail\">...</li>\n                <li class=\"" + allPageClassName + " " + pageNumberClassName + "\" " + dataNumberAttr + "='" + totalPageCount + "'>" + totalPageCount + "</li>\n            ";
        }
        else {
            for (var i = 2; i < totalPageCount + 1; i++) {
                paginationStr += "\n                    <li class=\"" + allPageClassName + " " + pageNumberClassName + "\" " + dataNumberAttr + "='" + i + "'>" + i + "</li>\n                ";
            }
        }
        paginationStr += "\n            <li class=\"" + allPageClassName + " " + nextClassName + " " + (totalPageCount === 1 ? disableNextClassName : '') + "\">\u4E0B\u4E00\u9875</li></ul>\n        ";
        container.innerHTML = paginationStr;
        this.initEvent();
    };
    Pagination.prototype.getElement = function (selector, all) {
        if (all === void 0) { all = false; }
        return all ? document.querySelectorAll(selector) : document.querySelector(selector);
    };
    Pagination.prototype.initEvent = function () {
        var _this = this;
        var state = this.state;
        var pageClassNameList = this.getElement('.' + state.allPageClassName, true);
        var pageNumber;
        pageClassNameList.forEach(function (item) {
            item.addEventListener(state.switchEvent, function (e) {
                var currentPageEle = e.target;
                var curPClassList = currentPageEle.classList;
                if (curPClassList.contains(state.activeClassName))
                    return;
                var dataNumberAttr = currentPageEle.getAttribute(state.dataNumberAttr);
                if (dataNumberAttr) {
                    pageNumber = +dataNumberAttr;
                }
                else if (curPClassList.contains(state.prevClassName)) {
                    state.curPage > 1 && (pageNumber = state.curPage - 1);
                }
                else if (curPClassList.contains(state.nextClassName)) {
                    state.curPage < state.totalPageCount && (pageNumber = state.curPage + 1);
                }
                pageNumber && _this.gotoPage(pageNumber);
            });
        });
    };
    Pagination.prototype.gotoPage = function (pageNumber) {
        var state = this.state;
        var allNumberPageLi = this.getElement("." + state.pageNumberClassName, true);
        var len = allNumberPageLi.length;
        if (!len || this.isIllegal(pageNumber))
            return;
        var activeEle = this.getElement("." + state.pageNumberClassName + "." + state.activeClassName);
        activeEle.classList.remove(state.activeClassName);
        if (state.activePosition) {
            var rightEllipse = state.totalPageCount - (state.maxShowBtnCount - state.activePosition) - 1;
            if (pageNumber <= state.maxShowBtnCount && (pageNumber < rightEllipse)) {
                if (+allNumberPageLi[1].getAttribute(state.dataNumberAttr) > 2) {
                    for (var i = 1; i < state.maxShowBtnCount + 1; i++) {
                        var inner = String(i + 1);
                        allNumberPageLi[i].innerText = inner;
                        allNumberPageLi[i].setAttribute(state.dataNumberAttr, inner);
                    }
                }
                this.hiddenEle(".ellipsis-head");
                this.hiddenEle(".ellipsis-tail", false);
                allNumberPageLi[pageNumber - 1].classList.add(state.activeClassName);
            }
            if (pageNumber > state.maxShowBtnCount && pageNumber < rightEllipse) {
                this.hiddenEle('.ellipsis-head', false);
                this.hiddenEle('.ellipsis-tail', false);
                for (var i = 1; i < state.maxShowBtnCount + 1; i++) {
                    var inner = '' + (pageNumber + (i - state.activePosition));
                    allNumberPageLi[i].innerText = inner;
                    allNumberPageLi[i].setAttribute(state.dataNumberAttr, inner);
                }
                allNumberPageLi[state.activePosition].classList.add(state.activeClassName);
            }
            if (pageNumber >= rightEllipse) {
                this.hiddenEle('.ellipsis-tail');
                this.hiddenEle('.ellipsis-head', false);
                if (+allNumberPageLi[len - 2].getAttribute(state.dataNumberAttr) < state.totalPageCount - 1) {
                    for (var i = 1; i < state.maxShowBtnCount + 1; i++) {
                        var inner = '' + (state.totalPageCount - state.maxShowBtnCount + i - 1);
                        allNumberPageLi[i].innerText = inner;
                        allNumberPageLi[i].setAttribute(state.dataNumberAttr, inner);
                    }
                }
                var activeIndex = state.maxShowBtnCount + 1 - (state.totalPageCount - pageNumber);
                allNumberPageLi[activeIndex].classList.add(state.activeClassName);
            }
        }
        else {
            allNumberPageLi[pageNumber - 1].classList.add(state.activeClassName);
        }
        state.curPage = pageNumber;
        this.prevNextAble();
        state.onPageChange && state.onPageChange(state);
    };
    Pagination.prototype.isIllegal = function (pageNumber) {
        var state = this.state;
        var curPage = state.curPage, totalPageCount = state.totalPageCount;
        return (curPage === pageNumber ||
            Math.ceil(pageNumber) !== pageNumber ||
            pageNumber > totalPageCount ||
            pageNumber < 1 ||
            typeof pageNumber !== 'number' ||
            pageNumber !== pageNumber);
    };
    Pagination.prototype.hiddenEle = function (selector, hidden) {
        if (hidden === void 0) { hidden = true; }
        this.getElement(selector).style.display = hidden ? 'none' : '';
    };
    Pagination.prototype.prevNextAble = function () {
        var state = this.state;
        var prevBtnClassList = this.getElement("." + state.prevClassName).classList;
        var nextBtnClassList = this.getElement("." + state.nextClassName).classList;
        state.curPage === 1 ? prevBtnClassList.add(state.disablePrevClassName) : prevBtnClassList.remove(state.disablePrevClassName);
        state.curPage === state.totalPageCount ? nextBtnClassList.add(state.disableNextClassName) : nextBtnClassList.remove(state.disableNextClassName);
    };
    return Pagination;
}());
