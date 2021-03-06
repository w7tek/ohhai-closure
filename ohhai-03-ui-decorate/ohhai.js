goog.provide('us.w7tek.ohhai');
goog.require('goog.dom');
goog.require('goog.ui.TableSorter');
goog.require('goog.async.Deferred');

us.w7tek.ohhai.startup = function () {
    var theTable = goog.dom.getElement('dataTable');

    us.w7tek.ohhai.updateTableData(theTable, function () {
        var sorter = new goog.ui.TableSorter();
        sorter.setDefaultSortFunction(goog.ui.TableSorter.alphaSort);

        sorter.decorate(theTable);
        sorter.sort(0);
    });
};

//  by adding event listener programmatically,
//  avoid the need to goog.exportSymbol
window.addEventListener('load', us.w7tek.ohhai.startup, false);

//  this method could make an xhr to pull in some data
//  or not, just for demonstration (this is a client-side demonstration)...
//  (also provides the opportunity to exhibit goog.async.Deferred)
us.w7tek.ohhai.updateTableData = function (tbl, complete_clbk) {
    var deferred = new goog.async.Deferred();

    deferred.addCallback(function (res) {
        //  Ordinarily, this would be the xhr completion handler

        var headRowLabels = res.shift();    //  the 'service' provides an array of column labels as the first result row
        var thead = goog.dom.createDom('thead');
        var tr = goog.dom.createDom('tr');
        goog.array.forEach(headRowLabels, function (it) {
            tr.appendChild(goog.dom.createDom('th', {}, it.toString()));
        });
        thead.appendChild(tr);

        var tbody = goog.dom.createDom('tbody');
        goog.array.forEach(res, function (row) {
            tr = goog.dom.createDom('tr');
            goog.array.forEach(row, function (it) {
                tr.appendChild(goog.dom.createDom('td', {}, it.toString()));
            });
            tbody.appendChild(tr);
        });

        goog.dom.removeChildren(tbl);   //  superfluous for this demo…

        tbl.appendChild(thead);
        tbl.appendChild(tbody);

        complete_clbk();
    });

    setTimeout(goog.bind(
        deferred.callback,
        deferred,
        /* this represents the value deserialized from the xhr... */
        [
            ['Name', 'Rank', 'Serial Number'],
            ['Jones', 'CPL', '123-45-6789'],
            ['Smith', 'SGT', '123-76-5432'],
            ['Davis', 'CPT', '456-78-1234'],
            ['Rayty', 'PFC', '997-67-6799']
        ]),
        2000);
};
