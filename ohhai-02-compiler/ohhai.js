goog.provide('us.w7tek.ohhai');
goog.require('goog.dom');

us.w7tek.ohhai.sayHai = function () {
    var newHeader =
        goog.dom.createDom('h1', { 'style': 'background-color:#EEE' }, 'Hai, Closure compiler!');

    goog.dom.appendChild(document.body, newHeader);
};

//  thwart renaming (advanced compilation would make the symbol unreachable from the .html)
goog.exportSymbol('us.w7tek.ohhai.sayHai', us.w7tek.ohhai.sayHai);