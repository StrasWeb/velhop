/*global L*/
/*jslint browser: true */
window.addEventListener('load', function () {
    'use strict';
    var map = L.map('mapdiv').setView([48.58476, 7.750576], 15), client = new XMLHttpRequest(), markers = L.layerGroup(), polyline = L.polyline([[48.58476, 7.750576]]);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors<br/>Donn&eacute;es fournies par la Compagnie des Transports Strasbourgeois'
    }).addTo(map);

    function handler(e) {
        if (e.target.readyState === e.target.DONE) {
            if (e.target.status === 200 && e.target.response !== null) {
                // success!
                var nodes, i;
                nodes = JSON.parse(e.target.response);
                for (i = 0; i < nodes.length; i += 1) {
                    markers.addLayer(L.marker([nodes[i].lat, nodes[i].long]).addTo(map).bindPopup("<b>" + nodes[i].name + "</b><br/>" + nodes[i].current + "/" + nodes[i].max));
                    polyline.addLatLng([nodes[i].lat, nodes[i].long]);
                }
                markers.addTo(map);
                map.fitBounds(polyline.getBounds());
            }
        }
    }


    client = new XMLHttpRequest();
    client.onreadystatechange = handler;
    client.open("GET", "getJSON.php");
    client.send();
}, false);

