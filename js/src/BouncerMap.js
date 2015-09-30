var App = App || {};

App.BouncerMap = function() {
    "use strict";
    /* eslint-env browser, jquery  */
    var that = new EventPublisher(),
        map;

    function loadMap(config) {
        initMap(config);
        that.notifyAll("mapUpdate", map)
    }

    function initMap(config) {
        map = new Array(config.height);
        for (var i = 0; i < map.length; i++) {
            map[i] = new Array(config.width);
        }

        for (var y = 0; y < config.height; y++) {
            for (var x = 0; x < config.width; x++) {
                setTileState(x, y, App.BouncerMap.TileState.EMPTY);
            }
        }
    }

    function clearBouncerTile() {
        for (var y = 0; y < map.length; y++) {
            for (var x = 0; x < map[0].length; x++) {
                if (map[x][y].getState() === App.BouncerMap.TileState.BOUNCER) {
                    setTileState(x, y, App.BouncerMap.TileState.EMPTY);
                    break;
                }
            }
        }

    }

    function setTileState(x, y, state, value) {
        switch (state) {
            case App.BouncerMap.TileState.EMPTY:
                map[x][y] = new App.BouncerMap.EmpytTile(x, y);
                break;
            case App.BouncerMap.TileState.COLOR:
                map[x][y] = new App.BouncerMap.ColorTile(x, y, value);
                break;
            case App.BouncerMap.TileState.BOUNCER:
                clearBouncerTile();
                map[x][y] = new App.BouncerMap.BouncerTile(x, y, value);
                break;
            case App.BouncerMap.TileState.BLOCKED:
                map[x][y] = new App.BouncerMap.BlockedTile(x, y);
                break;
        }
    }

    function updateTile(x, y, state, value) {
        setTileState(x, y, state, value);
        that.notifyAll("mapUpdate", map)
    }

    function getXML() {
        var xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n";
        xml += "<map>\n";
        for (var y = 0; y < map.length; y++) {
            for (var x = 0; x < map[0].length; x++) {
                if (map[x][y].getState() !== App.BouncerMap.TileState.EMPTY) {
                    xml += map[x][y].getXML() + "\n";
                }
            }
        }
        xml += "</map>";
        return xml;
    }


    that.loadMap = loadMap;
    that.updateTile = updateTile;
    that.getXML = getXML;
    return that;
};

App.BouncerMap.TileState = {};
App.BouncerMap.TileState.BLOCKED = "obstacle";
App.BouncerMap.TileState.COLOR = "color";
App.BouncerMap.TileState.EMPTY = "empty";
App.BouncerMap.TileState.BOUNCER = "bouncer";

App.BouncerMap.MapTile = function(x, y, state, value) {
    var that = {};

    function getX() {
        return x;
    }

    function getY() {
        return y;
    }

    function getState() {
        return state;
    }

    function getNode() {
        var valueClass = value || "";
        return Node.fromString("<span class='tile " + state + " " + valueClass + "' state='" + state + "' x='" + x + "' y='" + y + "'></span>");
    }

    function getXML() {
        return "<" + state + " x=\"" + x + "\" y=\"" + y + "\"  value=\"" + value + " \" />";
    }

    that.getX = getX;
    that.getY = getY;
    that.getState = getState;
    that.getNode = getNode;
    that.getXML = getXML;

    return that;
}

App.BouncerMap.EmpytTile = function(x, y) {
    var that = new App.BouncerMap.MapTile(x, y, App.BouncerMap.TileState.EMPTY);

    return that;
}

App.BouncerMap.ColorTile = function(x, y, color) {
    var that = new App.BouncerMap.MapTile(x, y, App.BouncerMap.TileState.COLOR, color);

    return that;
}

App.BouncerMap.BouncerTile = function(x, y) {
    var that = new App.BouncerMap.MapTile(x, y, App.BouncerMap.TileState.BOUNCER);

    return that;
}

App.BouncerMap.BlockedTile = function(x, y) {
    var that = new App.BouncerMap.MapTile(x, y, App.BouncerMap.TileState.BLOCKED);

    return that;
}
