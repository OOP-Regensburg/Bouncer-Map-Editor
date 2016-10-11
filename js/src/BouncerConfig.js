/* eslint-env browser  */
var BouncerEditor = BouncerEditor || {};
BouncerEditor.Config = (function() {
    "use strict";
    var that = {};

    /* data attributes */
    that.DATA_ATTRIBUTE_X_POS = "data-x";
    that.DATA_ATTRIBUTE_Y_POS = "data-y";
    that.DATA_ATTRIBUTE_STATE = "data-state";
    that.DATA_ATTRIBUTE_TYPE = "data-type";
    that.DATA_ATTRIBUTE_VALUE = "data-value";
    that.DATA_ATTRIBUTE_SHORTCUT = "data-shortcut";

    /* map information */
    that.TILE_STATE_BLOCKED = "OBSTACLE";
    that.TILE_STATE_EMPTY = "EMPTY";
    that.TILE_STATE_COLOR = "COLOR";
    that.TILE_STATE_BOUNCER = "BOUNCER";

    /* css classes */
    that.CSS_HIDDEN = "hidden";

    /* style information */
    that.STYLE_TILE_BORDER = 2;

    /* xml template */
    that.XML_HEADER_ELEMENT = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>";
    that.XML_NEW_LINE = "\n";
    that.XML_ROOT = "map";

    return that;
}());
