module.exports = function (source) {
    console.log('source>>>>', source);
    let result = source;
    result = compose(angleBracketTransfer, useLessHtmlTagRemove, hrTransfer, quotTransfer)(source);
    console.log('source>>>>', result);
    return result
}

function quotTransfer(str) { // 双引号转义
    return str.replace(/(&quot;)/g, '"');
}
function hrTransfer(str) { // 将字符串最开始的两个<hr>标签转换为hugo的---
    return str.replace('<hr>', '---').replace('<hr>', '---');
}
function useLessHtmlTagRemove(str) { // 位于于hugo的md文件头部特有的 --- 与 ---之间的代码被marddown-loader添加了html标签，需要移除
    const underlineIndex = _fundUnderlineIndex(str); // 获取第二个有效的---结束的位置
    console.log('underlineIndex', underlineIndex);
    const validStr = str.slice(0, underlineIndex + 1);
    console.log('validStr', validStr);
    const validStrHandled = _removeHtmlTag(validStr);
    function _fundUnderlineIndex(s) {
        let quotStart = false;
        let tempStr = '';
        let c = '';
        let i = 3, l = s.length;
        for (; i < l; i += 1) {
            c = s.charAt(i);
            if (c === '"') {
                quotStart = !quotStart;
                tempStr = '';
                continue;
            } else if (quotStart) {
                continue;
            } else if (c === '-') {
                tempStr += '-';
            }
            if (tempStr === '---') {
                return i;
            }
        }
    }
    function _removeHtmlTag(s) { // 目前先处理p标签
        return s.replace('<p>', '').replace('</p>', '');
    }
    return validStrHandled + str.slice(underlineIndex + 1);
}
function angleBracketTransfer(str) { // {{&lt;  转换为{{<    &gt;}}  转换为 >}}
    return str.replace(/({{&lt;)/g, '{{<').replace(/(&gt;}})/g, '>}}');
}
function compose(...funcs) {
    return function (initParams) {
        var funcList = Array.from(funcs).reverse();
        return funcList.reduce((params, func) => {
            return func(params);
        }, initParams);
    }
}