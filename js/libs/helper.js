/* eslint-env browser  */
(function(context) {
    "use strict";

    /* Adding a global EventPublisher prototype  */
    context.EventPublisher = context.EventPublisher || function() {
        this.listeners = {};
    };

    context.EventPublisher.prototype.addEventListener = function(event, listener) {
        if (this.listeners[event] === undefined) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(listener);
    };

    context.EventPublisher.prototype.removeEventListener = function(event, listener) {
        var index;
        if (this.listeners[event] === undefined) {
            return;
        }
        index = this.listeners[event].indexOf(listener);
        if (index > -1) {
            this.listeners[event].splice(index, 1);
        }
    };

    context.EventPublisher.prototype.notifyAll = function(event, data) {
        var i;
        for (i = 0; i < this.listeners[event].length; i++) {
            this.listeners[event][i]({
                target: this,
                data: data,
            });
        }
    };

    /* Resizing a nodes style attributes (width and height) to a square */
    Node.prototype.resizeToSquare = Node.prototype.resizeToSquare || function() {
        var size = Math.max(this.clientWidth, this.clientHeight);
        this.style.width = this.style.height = size + "px";
    };

    /* Create new HTML Node from string input */
    Node.fromString = function(nodeString) {
        var div = document.createElement("div");
        div.innerHTML = nodeString;
        if (div.childNodes.length === 1) {
            return div.childNodes[0];
        }
        return div.childNodes;
    };

    /* Add a global object for pseudo downloads */
    context.Downloader = context.Downloader || {};
    context.Downloader.downloadAsFile = function(filename, content, type, charset) {
        var element = document.createElement("a"),
            fileType = type || "text/plain",
            filecharset = charset || "utf-8";
        element.setAttribute("href", "data:"+fileType+";charset="+filecharset+"," + encodeURIComponent(content));
        element.setAttribute("download", filename);

        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

}(window));
