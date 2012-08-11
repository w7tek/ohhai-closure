
goog.provide('us.w7tek.ohhai');
goog.require('goog.dom');

us.w7tek.ohhai.sayHai = function () {
    var newHeader =
        goog.dom.createDom('h1', { 'style': 'background-color:#EEE' }, 'Hai, Closure namespace!');

    goog.dom.appendChild(document.body, newHeader);
};
