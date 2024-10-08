class LeafletMap {

    constructor(containerId, center, zoom) {
        this.map = L.map(containerId).setView(center, zoom);
        this.initTileLayer();

        this.attendanceCountBukels = 0;
        this.attendanceCountWako = 0;
        this.attendanceCountKNN = 0;

        this.markerCounts = {};
        this.markers = [];

        this.loggedData = []; 

        this.btn1 = document.getElementById('btn1');
        this.btn2 = document.getElementById('btn2');
        this.btn3 = document.getElementById('btn3');

        
        this.logCountElement = document.getElementById('logCountBukels');
        this.logCount1Element = document.getElementById('logCountWako');
        this.logCount2Element = document.getElementById('logCountKNN');
        this.idContainer = document.getElementById('logContainer');
        this.btnclear = document.getElementById('btnclear');

    }

    initTileLayer() {
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 17,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> Francis Adrian Idul | Sample of must visit eatery around NBSC vicinity'
        }).addTo(this.map);
    }

    addMarker(lat, long, message) {
        const marker = L.marker([lat, long]).addTo(this.map)
            .bindPopup(message);
    }

    loadMarkersFromJson(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.forEach(marker => {
                    this.addMarker(marker.latitude, marker.longitude, marker.message);
                });
            })
            .catch(error => console.error("Error Loading servers:", error));
    }



}
const Mymap = new LeafletMap('map', [8.360697, 124.867345], 17);


Mymap.loadMarkersFromJson('applet-2.json');

document.addEventListener('DOMContentLoaded', () => {
    Mymap.displayLogCount();
    Mymap.loadMarkersFromJson('applet-2.json');
});