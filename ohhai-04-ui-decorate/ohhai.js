
/*

compile from top-level:
 sh ../build/jsc.sh ADVANCED_OPTIMIZATIONS --namespace=us.w7tek.ohhai ohhai.js > ohhai-compiled.js

*/

goog.provide('us.w7tek.ohhai');
goog.require('goog.dom');
goog.require('goog.ui.TableSorter');
goog.require('goog.async.Deferred');

us.w7tek.ohhai.startup = function () {
    var theTable = goog.dom.getElement('dataTable');

    var sorter = new goog.ui.TableSorter();

    us.w7tek.ohhai.updateTableData(theTable);

    sorter.setDefaultSortFunction(goog.ui.TableSorter.alphaSort);
    sorter.decorate(theTable);
    sorter.sort(0);
};
goog.exportSymbol('us.w7tek.ohhai.startup', us.w7tek.ohhai.startup);

us.w7tek.ohhai.updateTableData = function (tbl) {
    //  maybe make an xhr to pull in some data
    //  or not, just for demonstration (this is a client-side demonstration)...
    var deferred = new goog.async.Deferred();

    deferred.addCallback(function (res) {
        //  Ordinarily, this would be the xhr completion handler

        var headRowLabels = res.shift();    //  the 'service' returns an array of column labels as the first result row
        var thead = goog.dom.createDom('thead');
        var theadRow = goog.dom.createDom('tr');
        goog.array.forEach(headRowLabels, function (it) {
            theadRow.appendChild(goog.dom.createDom('th', {}, it.toString()));
        });
        thead.appendChild(theadRow);

        var tbody = goog.dom.createDom('tbody');
        goog.array.forEach(res, function (row) {
            var tbodyRow = goog.dom.createDom('tr');
            goog.array.forEach(row, function (it) {
                tbodyRow.appendChild(goog.dom.createDom('td', {}, it.toString()));
            });
            tbody.appendChild(tbodyRow);
        });

        goog.dom.removeChildren(tbl);

        tbl.appendChild(thead);
        tbl.appendChild(tbody);
    });

    setTimeout(deferred.callback(
        /* this represents the value deserialized from the xhr... */
        [
            ['Name', 'Rank', 'Serial Number'],
            ['Jones', 'CPL', '123-45-6789'],
            ['Smith', 'SGT', '123-76-5432'],
            ['Davis', 'CPT', '456-78-1234'],
            ['Rayty', 'PFC', '997-67-6799']
        ]
    ), 2000);
};
