/* eslint-env browser */
/* global EventPublisher */

var BouncerEditor = BouncerEditor || {};
BouncerEditor.Menu = function(menu, config) {
    "use strict";
    var that = new EventPublisher();

    function onMenuEntryClicked(entryNode) {
        var type, value;
        if (entryNode !== undefined) {
            type = entryNode.getAttribute(config.DATA_ATTRIBUTE_TYPE);
            value = entryNode.getAttribute(config.DATA_ATTRIBUTE_VALUE);
            that.notifyAll("menuEntrySelected", {
                type: type,
                value: value,
            });
        }
    }

    function onMenuClicked(event) {
        var parent;

        if (event.target.nodeName === "SPAN") {
            parent = event.target.parentNode;
        }

        onMenuEntryClicked(parent);
    }

    function onKeyPressed(event) {
        var target, parent;
        if (menu.classList.contains(config.CSS_HIDDEN)) {
            return;
        }
        target = menu.querySelector("span[" + config.DATA_ATTRIBUTE_SHORTCUT + "='" + event.keyCode + "']");

        if (target.nodeName === "SPAN") {
            parent = target.parentNode;
        }

        onMenuEntryClicked(parent);
    }

    function setPosition(x, y, offset) {
        menu.style.top = (y + offset) + "px";
        menu.style.left = (x + offset) + "px";
    }

    function hide() {
        menu.classList.add(config.CSS_HIDDEN);
    }

    function show() {
        menu.classList.remove(config.CSS_HIDDEN);
    }

    function init() {
        menu.querySelector("ul").addEventListener("click", onMenuClicked);
        document.addEventListener("keypress", onKeyPressed);
    }

    init();

    that.setPosition = setPosition;
    that.hide = hide;
    that.show = show;
    return that;
};