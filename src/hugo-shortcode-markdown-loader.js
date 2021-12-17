"use strict";

const marked = require("marked");
module.exports = function (source) {
    let markdown = source;
    let result = '';
    const markdownTagStart = '<markdown>';
    const markdownTagStartLength = markdownTagStart.length;
    const markdownTagEnd = '</markdown>';
    const markdownTagEndLength = markdownTagEnd.length;
    const reg = new RegExp(/(<markdown>)[\s\S]*?(<\/markdown>)/g);
    const markdownArr = source.match(reg);
    // markdown.match(reg);
    console.log(markdownArr);
    result = markdown.replace(reg, (matchStr) => {
        let str = matchStr.slice(markdownTagStartLength, - markdownTagEndLength);
        // str = str.replace(/(\r\n)/g, '\n');
        const reg2 = /(?!(\r\n))\s+(?=#)/g;
        console.log(str.match(/(\r\n)/));
        str = str.replace(reg2, '');
        console.log(str.match(/^.{1}/g));
        console.log('reg2=', reg2.test(str));
        console.log(matchStr);
        console.log('str=', str);
        return marked(str);
    });
    // console.log(result);
    return result;
}

function markdownTransfer(markdown) {

}