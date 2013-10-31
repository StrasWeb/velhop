/*global OpenLayers*/
/*jslint browser: true */
window.addEventListener('load', function () {
    'use strict';
    var map = new OpenLayers.Map("mapdiv"), lonLat = new OpenLayers.LonLat(7.750576, 48.58476).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()), zoom = 15, markers = new OpenLayers.Layer.Markers(), client = new XMLHttpRequest();
    map.addLayer(new OpenLayers.Layer.OSM());

    map.addLayer(markers);

    map.setCenter(lonLat, zoom);

    function handler(e) {
        if (e.target.readyState === e.target.DONE) {
            if (e.target.status === 200 && e.target.response !== null) {
                // success!
                var nodes, i;
                nodes = JSON.parse(e.target.response);
                for (i = 0; i < nodes.length; i += 1) {
                    lonLat = new OpenLayers.LonLat(nodes[i].long, nodes[i].lat);
                    markers.addMarker(new OpenLayers.Marker(lonLat.transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject())));
                    map.addPopup(new OpenLayers.Popup.FramedCloud(null, lonLat, null, "<b>" + nodes[i].name + "</b><br/>" + nodes[i].current + "/" + nodes[i].max, null, false));
                }
            }
        }
    }


    client = new XMLHttpRequest();
    client.onreadystatechange = handler;
    client.open("GET", "getJSON.php");
    client.send();
}, false);

