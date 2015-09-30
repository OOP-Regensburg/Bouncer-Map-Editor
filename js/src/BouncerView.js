var App = App || {};
App.BouncerView = function(mapNode) {
    "use strict";
    /* eslint-env browser, jquery  */
    var that = new EventPublisher();

    function onTileClicked(event) {
        var tile = {
            mouseX: event.clientX,
            mouseY: event.clientY,
            x: event.target.getAttribute("x"),
            y: event.target.getAttribute("y"),
            state: event.target.getAttribute("state")
        }
        that.notifyAll("tileClicked", tile);
    }

    function render(matrix) {
        var tileNode,
            tileHeight = parseFloat(mapNode.offsetHeight) / matrix.length,
            tileWidth = parseFloat(mapNode.offsetWidth) / matrix[0].length;

        while (mapNode.firstChild) {
            mapNode.removeChild(mapNode.firstChild);
        }

        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[0].length; x++) {
                tileNode = matrix[x][y].getNode();
                tileNode.style.height = (tileHeight - 2) + "px";
                tileNode.style.width = (tileWidth - 2) + "px";
                tileNode.addEventListener("click", onTileClicked);
                mapNode.appendChild(tileNode);
            }
        }
    }

    function init() {
        mapNode.resizeToSquare();
    }

    init();

    that.render = render;
    return that;
};
