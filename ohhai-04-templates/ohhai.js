goog.provide('us.w7tek.ohhai');
goog.require('us.w7tek.ohhai.soy');

us.w7tek.ohhai.sayHai = function (ev) {
    console.log('oh, hai, world!');
    document.write(us.w7tek.ohhai.soy.ohhai());
};

window.addEventListener('load', us.w7tek.ohhai.sayHai, false);