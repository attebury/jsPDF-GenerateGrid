/** @preserve 
jsPDF Generate Grid plugin
Copyright (c) 2019 John Attebury @attebury
MIT license.
*/
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
Returns an object of page dimensions

@function
@returns {Object}
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
Calculate columns used for the grid

@function
@param {number} pageMargin
@param {number} columns
@param {number} gutterWidth
@param columnWidth
@returns {Array} cols -
*/
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
Returns an object of coordinates for grid

@public
@function
@param {object} options 
@param {number} options.pageMargin - where to stop and stop the page
@param {number} options.columns - the number of columns in the grid
@param {number} [options.gutterWidth] - optional - specify the width between columns 
@param {number} options.columnMargin 
@returns {Object} grid
*/
    var generateGrid = API.generateGrid = function (options) {
        'use strict'

        var gWidth
            , numberOfGutters
            , pageDimensions
            , pageWidth
            , pageHeight
            , horizontalCenter
            , verticalCenter
            , availablePageWidth
            , availablePageHeight
            , columnWidth
            , xPos
            , cols
            , grid
            , columns
            , pageMargin
            , columnMargin
            , gutterWidth;

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
        horizontalCenter = pageDimensions.hc;
        verticalCenter = pageDimensions.vc;

        availablePageWidth = pageWidth - (pageMargin * 2);
        availablePageHeight = pageHeight - (pageMargin * 2);        

        numberOfGutters = columns - 1;

        columnWidth = (availablePageWidth - (gWidth * numberOfGutters)) / columns;

        cols = setPageColumns(pageMargin, columns, gWidth, columnWidth);

        grid = {
            aWidth: availablePageWidth
            , aHeight: availablePageHeight
            , hCenter: horizontalCenter
            , vCenter: verticalCenter
            , cols: cols
        }

        return grid;
}

})(jsPDF.API);
