
goog.provide('us.w7tek.ohhai');

goog.require('us.w7tek.ohhai.soy');
goog.require('goog.dom');

goog.exportSymbol('us.w7tek.ohhai.sayHai', function () {
    document.write(us.w7tek.ohhai.soy.ohhai());
});