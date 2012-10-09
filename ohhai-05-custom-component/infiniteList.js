/**
 * @fileoverview InfiniteList is a {@link goog.ui.Control} that can load additional content items on-demand, appending
 * the loaded data to the control's domElement.
 * @author Tommy Knowlton
 */
goog.provide('us.w7tek.ohhai.InfiniteList');

goog.require('goog.ui.Control');
goog.require('goog.ui.ControlRenderer');

/**
 * An instance of populator_ƒ is a function that receives an appender_callback_ƒ (a function). The populator_ƒ somehow
 * obtains additional data to append, and calls the appender_callback_ƒ, passing an Array.<HTMLLIElement> to it. (The
 * appender_callback_ƒ is provided by the InfiniteListRenderer, and manipulates the dom associated with this control).
 * @typedef {function(us.w7tek.ohhai.InfiniteListRenderer.appender_callback_ƒ)}
 */
us.w7tek.ohhai.InfiniteList.populator_ƒ;

/**
 *  Creates a new InfiniteList.
 *  @param {HTMLOListElement|HTMLUListElement} content ListElement DOM structure to display as the content of the
 *  component (if any).
 *  @param {goog.ui.ControlRenderer=} opt_renderer Renderer used to render or decorate the component; defaults
 *  to an instance of {@link us.w7tek.ohhai.InfiniteListRenderer}.
 *  @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for document interaction.
 *  @param {us.w7tek.ohhai.InfiniteList.populator_ƒ=} opt_populator
 *  @constructor
 *  @extends {goog.ui.Control}
 */
us.w7tek.ohhai.InfiniteList = function (content, opt_renderer, opt_domHelper, opt_populator) {
    console.log('[INFO]: instantiating InfiniteList');

    if (!opt_renderer) opt_renderer = us.w7tek.ohhai.InfiniteListRenderer.getInstance();
    if (!opt_domHelper) opt_domHelper = goog.dom.getDomHelper(document);

    goog.base(this, content, opt_renderer, opt_domHelper);

    if (!opt_populator) {
        opt_populator = us.w7tek.ohhai.InfiniteList.defaultPopulator_;
    }

    /**
     *  @type {us.w7tek.ohhai.InfiniteList.populator_ƒ}
     *  @private
     */
    this.populator_ƒ_ = opt_populator;

    /**
     * Is a call to populate() in-progress - used to prevent sending additional server requests while already
     * waiting on one.
     * @type {boolean}
     * @private
     */
    this.populateInProgress_ = false;
};
goog.inherits(us.w7tek.ohhai.InfiniteList, goog.ui.Control);

/**
 *  A populator_ƒ that always provides an empty array of list elements to the ƒ. Used whenever a populator is not
 *  provided at construction.
 *  @type {us.w7tek.ohhai.InfiniteList.populator_ƒ}
 *  @private
 */
us.w7tek.ohhai.InfiniteList.defaultPopulator_ = function (ƒ) {
    console.log('[WARNING]: InfiniteList default populator called.');

    /** @type {Array.<HTMLLIElement>} */ var populateItems = [];

    setTimeout(goog.partial(ƒ, populateItems), 0);
};

/**
 * Assign the callback to be used when this InfiniteList demands additional items (e.g., because it has been scrolled
 * toward the current tail of the list).
 * @param {us.w7tek.ohhai.InfiniteList.populator_ƒ} f
 */
us.w7tek.ohhai.InfiniteList.prototype.setPopulator = function (f) {
    this.populator_ƒ_ = f;
};

/**
 * Is the populator waiting on a response from the server?
 * @return {boolean}
 */
us.w7tek.ohhai.InfiniteList.prototype.isPopulating = function () {
    return this.populateInProgress_;
};

/**
 * Demand-load additional items to be appended to the tail of the list.
 * @param {us.w7tek.ohhai.InfiniteListRenderer.appender_callback_ƒ} appender
 */
us.w7tek.ohhai.InfiniteList.prototype.doPopulate = function (appender) {
    if (!this.populateInProgress_) {
        this.populateInProgress_ = true;

        var self = this;
        var ƒ = function (items) {
            self.populateInProgress_ = false;
            appender(items);
        };
        this.populator_ƒ_(ƒ);
    }
};


/**
 * @constructor
 * @extends {goog.ui.ControlRenderer}
 */
us.w7tek.ohhai.InfiniteListRenderer = function () {
    console.log('[INFO]: instantiating InfiniteListRenderer');
    goog.base(this);

    //  cause this renderer to be registered for decorating elements that carry the CSS class
    goog.ui.registry.setDecoratorByClassName(this.getCssClass(),
        function () {
            return new us.w7tek.ohhai.InfiniteList(null);
        });
};
goog.inherits(us.w7tek.ohhai.InfiniteListRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(us.w7tek.ohhai.InfiniteListRenderer);
goog.ui.registry.setDefaultRenderer(us.w7tek.ohhai.InfiniteList, us.w7tek.ohhai.InfiniteListRenderer);

/**
 * A callback function that is passed to a populator_ƒ instance when the InfiniteList control requires additional data.
 * @typedef {function(Array.<HTMLLIElement>)}
 */
us.w7tek.ohhai.InfiniteListRenderer.appender_callback_ƒ;

/**
 * @type {string}
 */
us.w7tek.ohhai.InfiniteListRenderer.CSS_CLASS = 'w7tek-infinite-list';

/**
 * @inheritDoc
 */
us.w7tek.ohhai.InfiniteListRenderer.prototype.getCssClass = function () {
    return us.w7tek.ohhai.InfiniteListRenderer.CSS_CLASS;
};


/**
 * @inheritDoc
 */
us.w7tek.ohhai.InfiniteListRenderer.prototype.canDecorate = function (element) {
    return element.tagName === 'OL' || element.tagName === 'UL';
};

/**
 * @inheritDoc
 */
us.w7tek.ohhai.InfiniteListRenderer.prototype.initializeDom = function (infiniteList) {
    goog.base(this, 'initializeDom', infiniteList);

    this.setScrollHandler_((/** @type {us.w7tek.ohhai.InfiniteList} */ infiniteList));
};

/**
 * Add a scroll event handler to the control's dom, that will demand-populate the list, whenever the list is scrolled
 * toward near its current tail.
 * @param {us.w7tek.ohhai.InfiniteList} infiniteList
 * @private
 */
us.w7tek.ohhai.InfiniteListRenderer.prototype.setScrollHandler_ = function (infiniteList) {
    var self = this;

    var scrollHandler = function (ev) {
        if (!infiniteList.isPopulating()) {
            var dom = goog.dom.getDomHelper(ev.target);
            var scrollTop = ev.target.scrollTop;
            var scrollHeight = ev.target.scrollHeight;
            var clientHeight = ev.target.clientHeight;
            var children = ev.target.children;

            var heightOfLastItems = 0;
            if (children.length > 1) {
                heightOfLastItems = children[children.length - 1].clientHeight + children[children.length - 2].clientHeight;
            } else if (children.length) {
                heightOfLastItems = children[children.length - 1].clientHeight;
            }

            if (scrollTop + clientHeight > (scrollHeight - heightOfLastItems)) {
                ev.target.appendChild(dom.createDom('li', null, ['loading...']));
                infiniteList.doPopulate(goog.bind(self.addListItems_, self, infiniteList));
            }
        }
    };

    infiniteList.getContentElement().addEventListener('scroll', scrollHandler, false);
};

/**
 * Add the indicated items to the bottom of the list. This is the only actual appender_t instance that is ever
 * passed to the populator.
 * @param {us.w7tek.ohhai.InfiniteList} infiniteList
 * @param {Array.<HTMLLIElement>} items
 * @private
 */
us.w7tek.ohhai.InfiniteListRenderer.prototype.addListItems_ = function (infiniteList, items) {
    var contentElement = infiniteList.getContentElement();

    contentElement.removeChild(contentElement.children[contentElement.children.length - 1]);
    if (items.length) {
        console.log('[INFO]: adding ' + items.length + ' items to InfiniteList');
        for (var i in items) {
            contentElement.appendChild(items[i]);
        }
    } else {
        console.log('[WARNING]: adding 0 items to InfiniteList');
    }
};

/* instantiate the singleton, for the side-effect of registering the renderer with setDecoratorByClassName */
us.w7tek.ohhai.InfiniteListRenderer.getInstance();
