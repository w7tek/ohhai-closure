goog.provide('us.w7tek.ohhai');
goog.require('us.w7tek.ohhai.InfiniteList');

/**
 * Start things off by handling the global onload event.
 * @param {Event} ev
 */
us.w7tek.ohhai.onload = function (ev) {
    var iList = goog.dom.getElement('infinite-list');
    var component = goog.ui.decorate(iList);

    var count = 1;
    component.setPopulator(function (appender_f) {
        /** @type {Array.<HTMLLIElement>} */ var newItems = [];

        for (var limit = count + 10; count < limit; ++count) {
            var text = "Additional Item " + count;
            var li = goog.dom.createDom('li');
            li.textContent = text;
            newItems.push(li);
        }

        setTimeout(goog.partial(appender_f, newItems), 600);    //  simulate 600ms server request roundtrip
    });
};

window.addEventListener('load', us.w7tek.ohhai.onload, false);