/** @preserve 
 * jsPDF Generate Grid plugin
 * @author John Attebury @attebury
 * MIT license.
 * */
/**
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================
 */
;(function(API) {
'use strict'

/**
 * Returns an object of page dimensions
 *
 * @function
 * 
 * 
 * @returns {Object}
*/
var getPageDimensions = API.getPageDimensions = function(that) {
    var width
        , height
        , horizontalCenter
        , verticalCenter;

    width = that.internal.pageSize.getWidth();
    height = that.internal.pageSize.getHeight();

    horizontalCenter = width / 2;
    verticalCenter = height / 2;

    return {
        w: width
        , hc: horizontalCenter
        , h: height
        , vc: verticalCenter
    }
}

/**
 * Calculate column coordinates used for the grid
 *
 * @function
 * 
 * @param {number} pageMargin
 * @param {number} columns
 * @param {number} gutterWidth
 * @param columnWidth
 * 
 * @returns {Array} cols 
 * */
var setPageColumns = API.setPageColumns = function(pageMargin, columns, gutterWidth, columnWidth) {
    var xPos
    , cNumber
    , gWidth
    , cWidth
    , cols;

    xPos = pageMargin;
    cNumber = columns;
    gWidth = gutterWidth;
    cWidth = columnWidth;

    cols = [];

    for (var i = 0; i < cNumber; i++) {

        // add gutter widths after the first column
        if (i > 0) {
            xPos += gWidth;
        }

        var begin = xPos;

        // add the column width
        xPos += cWidth;

        var end = xPos;

        // calculate the center of the column
        var center = end - (cWidth / 2);

        cols.push({ x: begin, xe: end, xc: center });
    }

    return cols;    
}

/**
 * Returns an object of coordinates for grid
 * 
 * @function
 * 
 * @param {object} options
 * @param {number} options.pageMargin where to stop and stop the page
 * @param {number} options.columns the number of columns in the grid
 * @param {number} [options.gutterWidth] optional - specify the width between columns
 * @param {number} options.columnMargin margin between columns
 * 
 * @returns {Object} grid
 * 
 * */
    var generateGrid = API.generateGrid = function (options) {
        'use strict'

        var availablePageHeight
            , availablePageWidth
            , cols
            , colsLength
            , colsLast
            , columnMargin
            , columns
            , columnWidth
            , grid
            , gutterWidth
            , gWidth
            , centerHoriztonal
            , centerVertical
            , numberOfGutters
            , pageDimensions
            , pageMargin
            , pageWidth
            , pageHeight
            , xPos
            , xCenter
            , xLeft
            , xRight;

        columns = options.columns;
        pageMargin = options.pageMargin;
        columnMargin = options.columnMargin;

        // if gutter width is not specified, double the page margin
        if (!options.gutterWidth) {
            gWidth = columnMargin * 2;
        } else {
            gWidth = options.gutterWidth;
        }

        pageDimensions = getPageDimensions(this);

        pageWidth = pageDimensions.w;
        pageHeight = pageDimensions.h;   
        centerHoriztonal = pageDimensions.hc;
        centerVertical = pageDimensions.vc;

        availablePageWidth = pageWidth - (pageMargin * 2);
        availablePageHeight = pageHeight - (pageMargin * 2);        

        numberOfGutters = columns - 1;

        columnWidth = (availablePageWidth - (gWidth * numberOfGutters)) / columns;

        cols = setPageColumns(pageMargin, columns, gWidth, columnWidth);
        colsLength = cols.length;
        colsLast = colsLength - 1;

        xLeft = cols[0].x;
        xRight = cols[colsLast].xe;
        

        grid = {
            aWidth: availablePageWidth
            , aHeight: availablePageHeight
            , hCenter: centerHoriztonal
            , vCenter: centerVertical
            , cols: cols
            , pageMargin: pageMargin
            , pageHeight: pageHeight
            , pageWidth: pageWidth
            , xLeft: xLeft
            , xRight: xRight
        }

        return grid;
}

})(jsPDF.API);
