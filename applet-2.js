class LeafletMap {

    constructor(containerId, center, zoom) {
        this.map = L.map(containerId).setView(center, zoom);
        this.initTileLayer();

        this.attendanceCountB = 0;
        this.attendanceCountW = 0;
        this.attendanceCountK = 0;

        this.loggedData = [];

        this.btn = document.getElementById('btn1');
        this.btn1 = document.getElementById('btn2');
        this.btn2 = document.getElementById('btn3');

        this.btnclear = document.getElementById('btnclear');
        this.logCountElement = document.getElementById('logCountBukels');
        this.logCount1Element = document.getElementById('logCountWWE');
        this.logCount2Element = document.getElementById('logCountKNN');
        this.idContainer = document.getElementById('logContainer');

        this.btn.addEventListener('click', () => this.dataB());
        this.btn1.addEventListener('click', () => this.dataW());
        this.btn2.addEventListener('click', () => this.dataK());
        this.btnclear.addEventListener('click', () => this.clearLogs());
    }

    initTileLayer() {
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 17,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> Francis Adrian Idul | Must Visit Eatery Around NBSC Vicinity'
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


    clearLogs() {
        this.attendanceCountB = 0;
        this.attendanceCountW = 0;
        this.attendanceCountK = 0;

        this.loggedData = [];
        this.updateLogDisplay();
    }

    displayLogCount() {
        this.logCountElement.innerHTML = `Bukel's Cafeteria, Store & Print Shop: ${this.attendanceCountB}`;
        this.logCount1Element.innerHTML = `Wako Wako Eatery: ${this.attendanceCountW}`;
        this.logCount2Element.innerHTML = `Karenderya ni Nanay: ${this.attendanceCountK}`;
    }

    dataB() {
        this.addMarker(8.361655, 124.867307, "Bukel's Cafeteria, Store & Print Shop");
        this.attendanceCountB++;
        this.updateLogDisplay();
    }

    dataW() {
        this.addMarker(8.362302, 124.867640, 'Wako Wako Eatery');
        this.attendanceCountW++;
        this.updateLogDisplay();
    }

    dataK() {
        this.addMarker(8.360823, 124.866330, 'Kalenderya ni Nanay');
        this.attendanceCountK++;
        this.updateLogDisplay();
    }

    updateLogDisplay() {
        this.idContainer.innerHTML = '';
        this.loggedData.forEach(data => {
            const logItem = document.createElement('div');
            logItem.className = 'log-item';
            this.idContainer.appendChild(logItem);
        });
        this.displayLogCount();
    }

}
const Mymap = new LeafletMap('map', [8.360697, 124.867345], 17);


Mymap.loadMarkersFromJson('applet-2.json');

document.addEventListener('DOMContentLoaded', () => {
    Mymap.displayLogCount();
    Mymap.loadMarkersFromJson('applet-2.json');
});