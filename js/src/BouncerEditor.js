/* eslint-env browser  */
/* global Downloader */
var BouncerEditor = (function() {
    "use strict";

    var that = {},
        DEFAULTS = {
            MAP: {
                width: 15,
                height: 15,
            },
        },
        config,
        view,
        map,
        menu,
        downloadButton,
        currentField;

    function downloadXML() {
        var xml = map.getXML();
        Downloader.downloadAsFile("Bouncer.xml", xml, "text/xml");
    }

    function onTileClicked(event) {
        currentField = {
            x: event.data.x,
            y: event.data.y,
            state: event.data.state,
        };
        menu.setPosition(event.data.mouseX, event.data.mouseY, 5);
        menu.show();
    }

    function onMenuEntrySelected(event) {
        menu.hide();
        if (currentField !== undefined) {

            map.updateTile(currentField.x, currentField.y, event.data.type, event.data.value);
            currentField = undefined;
        }
    }

    function init() {
        config = BouncerEditor.Config;
        view = new BouncerEditor.View(document.querySelector(".map"), config);
        view.addEventListener("tileClicked", onTileClicked);

        menu = new BouncerEditor.Menu(document.querySelector(".menu"), config);
        menu.hide();
        menu.addEventListener("menuEntrySelected", onMenuEntrySelected);

        map = new BouncerEditor.Map(config);
        map.addEventListener("mapUpdate", function(data) {
            view.render(data.data);
        });
        map.loadMap(DEFAULTS.MAP);

        downloadButton = document.querySelector("#menu .download");
        downloadButton.addEventListener("click", downloadXML);
    }

    that.init = init;
    return that;
}());
