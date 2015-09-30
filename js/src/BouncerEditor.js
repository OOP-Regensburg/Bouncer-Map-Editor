var App = App || {};
App.BouncerEditor = (function() {
    "use strict";
    /* eslint-env browser, jquery  */

    var view,
    	map,
        menu,
        currentField = {
        	x: 0,
        	y: 0,
        	state: undefined
        };

    function downloadXML() {
    	var xml = map.getXML();
    	download(xml, "Bouncer.xml", "text/xml");
    }

    function init() {
        view = new App.BouncerView(document.querySelector(".map"));
        view.addEventListener("tileClicked", function(data) {
        	currentField.x = data.data.x;
        	currentField.y = data.data.y;
        	currentField.state = data.data.state;
        	menu.setPosition(data.data.mouseX, data.data.mouseY, 5);
        	menu.show();
        });

        map = new App.BouncerMap();
        map.addEventListener("mapUpdate", function(data) {
        	view.render(data.data);
        });

        menu = new App.BouncerMenu(document.querySelector(".menu"));
        menu.hide();
        menu.addEventListener("menuEntrySelected", function(data) {
        	menu.hide();
       		map.updateTile(currentField.x, currentField.y, data.data.type, data.data.value);
        });

        map.loadMap({
            width: 15,
            height: 15
        });

        document.querySelector("#menu .download").addEventListener("click", downloadXML);  
    }

    return {
        init: init
    };
}());
