/* eslint-env browser  */
/* global EventPublisher */

var BouncerEditor = BouncerEditor || {};
BouncerEditor.View = function(map, config) {
    "use strict";
    var that = new EventPublisher();

    function onTileClicked(event) {
        var tile = {
            mouseX: event.clientX,
            mouseY: event.clientY,
            x: event.target.getAttribute(config.DATA_ATTRIBUTE_X_POS),
            y: event.target.getAttribute(config.DATA_ATTRIBUTE_Y_POS),
            state: event.target.getAttribute(config.DATA_ATTRIBUTE_STATE),
        };
        that.notifyAll("tileClicked", tile);
    }

    function render(matrix) {
        var tileNode, tileHeight, tileWidth;
        map.resizeToSquare();
        tileHeight = parseFloat(map.clientHeight) / matrix.length;
        tileWidth = parseFloat(map.clientWidth) / matrix[0].length;

        while (map.firstChild) {
            map.removeChild(map.firstChild);
        }

        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[0].length; x++) {
                tileNode = matrix[x][y].getNode();
                tileNode.style.height = (tileHeight - config.STYLE_TILE_BORDER) + "px";
                tileNode.style.width = (tileWidth - config.STYLE_TILE_BORDER) + "px";
                tileNode.addEventListener("click", onTileClicked);
                map.appendChild(tileNode);
            }
        }
    }

    that.render = render;
    return that;
};