var App = App || {};
App.BouncerMenu = function (menuNode) {
    "use strict";
    /* eslint-env browser, jquery  */
    var that = new EventPublisher();

    function onMenuClicked(event) {
        var parent, type, value;

        if(event.target.nodeName === "SPAN") {
            parent = event.target.parentNode;
        }

        if(parent !== undefined) {
            type = parent.getAttribute("type");
            value = parent.getAttribute("value");
            that.notifyAll("menuEntrySelected", {
                type: type,
                value: value
            });
        }

    }

    function setPosition(x,y,offset) {
        menuNode.style.top = (y + offset) + "px";
        menuNode.style.left = (x + offset) + "px";
    }

    function hide() {
        menuNode.classList.add("hidden");
    }

    function show() {
        menuNode.classList.remove("hidden");
    }

    function init() {
        menuNode.querySelector("ul").addEventListener("click", onMenuClicked);
    }

    init();

    that.setPosition = setPosition;
    that.hide = hide;
    that.show = show;
    return that;
};
