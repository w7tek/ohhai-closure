/*
 *  Originally taken from https://developers.google.com/closure/library/docs/gettingstarted.
 */

goog.require('goog.dom');

function sayHai() {

    var newHeader =
        goog.dom.createDom('h1', { 'style': 'background-color:#EEE' }, 'Hai, Closure!');

    goog.dom.appendChild(document.body, newHeader);
}
