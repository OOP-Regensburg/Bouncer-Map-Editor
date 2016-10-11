/* eslint-env browser  */
/* global EventPublisher */

var BouncerEditor = BouncerEditor || {};
BouncerEditor.Map = function(config) {
    "use strict";
    var that = new EventPublisher(),
        map;

    function loadMap(data) {
        initMap(data);
        that.notifyAll("mapUpdate", map);
    }

    function initMap(data) {
        map = new Array(data.height);
        for (let i = 0; i < map.length; i++) {
            map[i] = new Array(data.width);
        }

        for (let y = 0; y < data.height; y++) {
            for (let x = 0; x < data.width; x++) {
                setTile(x, y, BouncerEditor.Map.TileState.EMPTY);
            }
        }
    }

    function clearBouncerTile() {
        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[0].length; x++) {
                if (map[x][y].getType() === BouncerEditor.Map.TileState.BOUNCER) {
                    setTile(x, y, BouncerEditor.Map.TileState.EMPTY);
                    break;
                }
            }
        }

    }

    function setTile(x, y, type, value) {
        switch (type) {
            case BouncerEditor.Map.TileState.EMPTY:
                map[x][y] = new BouncerEditor.Map.EmpytTile(x, y);
                break;
            case BouncerEditor.Map.TileState.COLOR:
                map[x][y] = new BouncerEditor.Map.ColorTile(x, y, value);
                break;
            case BouncerEditor.Map.TileState.BOUNCER:
                clearBouncerTile();
                map[x][y] = new BouncerEditor.Map.BouncerTile(x, y, value);
                break;
            case BouncerEditor.Map.TileState.BLOCKED:
                map[x][y] = new BouncerEditor.Map.BlockedTile(x, y);
                break;
            default:
                break;
        }
    }

    function updateTile(x, y, type, value) {
        setTile(x, y, type, value);
        that.notifyAll("mapUpdate", map);
    }

    function getXML() {
        var xml = config.XML_HEADER_ELEMENT + config.XML_NEW_LINE;
        xml += "<" + config.XML_ROOT + ">" + config.XML_NEW_LINE;
        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[0].length; x++) {
                if (map[x][y].getType() !== BouncerEditor.Map.TileState.EMPTY) {
                    xml += map[x][y].getXML() + "\n";
                }
            }
        }
        xml += "</" + config.XML_ROOT + ">";
        return xml;
    }

    BouncerEditor.Map.TileState = {};
    BouncerEditor.Map.TileState.BLOCKED = config.TILE_STATE_BLOCKED;
    BouncerEditor.Map.TileState.COLOR = config.TILE_STATE_COLOR;
    BouncerEditor.Map.TileState.EMPTY = config.TILE_STATE_EMPTY;
    BouncerEditor.Map.TileState.BOUNCER = config.TILE_STATE_BOUNCER;

    BouncerEditor.Map.MapTile = function(x, y, type, value) {
        var that = {},
            tileType = type || "",
            tileValue = value || "",
            tileX = x || 0,
            tileY = y || 0;

        function getX() {
            return tileX;
        }

        function getY() {
            return tileY;
        }

        function getType() {
            return tileType;
        }

        function getValue() {
            return tileValue;
        }

        function getNode() {
            var valueClass = that.getValue() || "";
            return Node.fromString("<span class='tile " + that.getType().toLowerCase() + " " + valueClass.toLowerCase() + "' data-type='" + that.getType() + "' data-value='" + that.getValue().toLowerCase() + "' data-x='" + that.getX() + "' data-y='" + that.getY() + "'></span>");
        }

        function getXML() {
            return "<" + that.getType().toLowerCase() + " x=\"" + that.getX() + "\" y=\"" + that.getY() + "\"  value=\"" + that.getValue() + "\" />";
        }

        that.getX = getX;
        that.getY = getY;
        that.getType = getType;
        that.getValue = getValue;
        that.getNode = getNode;
        that.getXML = getXML;

        return that;
    };

    BouncerEditor.Map.EmpytTile = function(x, y) {
        var that = new BouncerEditor.Map.MapTile(x, y, BouncerEditor.Map.TileState.EMPTY);

        return that;
    };

    BouncerEditor.Map.ColorTile = function(x, y, color) {
        var that = new BouncerEditor.Map.MapTile(x, y, BouncerEditor.Map.TileState.COLOR, color);
        return that;
    };

    BouncerEditor.Map.BouncerTile = function(x, y) {
        var that = new BouncerEditor.Map.MapTile(x, y, BouncerEditor.Map.TileState.BOUNCER);

        return that;
    };

    BouncerEditor.Map.BlockedTile = function(x, y) {
        var that = new BouncerEditor.Map.MapTile(x, y, BouncerEditor.Map.TileState.BLOCKED);

        return that;
    };

    that.loadMap = loadMap;
    that.updateTile = updateTile;
    that.getXML = getXML;
    return that;
};
