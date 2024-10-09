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

        this.btn.addEventListener('click', () => this.dataBukels());
        this.btn1.addEventListener('click', () => this.dataWako());
        this.btn2.addEventListener('click', () => this.dataKNN());
        this.btnclear.addEventListener('click', () => this.clearLogs());

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


    displayLogCount() {
        this.logCountElement.innerHTML = `Bukels Attendance: ${this.attendanceCountSC}`;
        this.logCount1Element.innerHTML = `Wako Attendance: ${this.attendanceCountBA}`;
        this.logCount2Element.innerHTML = `KNN Laboratory Attendance: ${this.attendanceCountLab}`;

    }
    dataBukels() {
        this.addMarker(8.361655, 124.867307, "Bukel's Cafeteria, Store & Print Shop");
        this.attendanceCountBukels++;
        this.updateLogDisplay();
    }

    dataWako() {
        this.addMarker(8.362302, 124.867640, 'Wako Wako Eatery');
        this.attendanceCountWako++;
        this.updateLogDisplay();
    }

    dataKNN() {
        this.addMarker(8.360823, 124.866330, 'Kalenderya ni Nanay');
        this.attendanceCountKNN++;
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

    clearLogs() {
        this.attendanceCountBukels = 0;
        this.attendanceCountWako = 0;
        this.attendanceCountKNN = 0;

        this.loggedData = [];
        this.markerCounts = {};
        this.markers.forEach(marker => {
            const message = marker.getPopup().getContent().split('<br>')[0];
            this.markerCounts[message] = 0;
            this.updateMarkerPopup(marker, message);
        });

        this.updateLogDisplay();
    }


}
const Mymap = new LeafletMap('map', [8.360697, 124.867345], 17);


Mymap.loadMarkersFromJson('applet-2.json');

document.addEventListener('DOMContentLoaded', () => {
    Mymap.displayLogCount();
    Mymap.loadMarkersFromJson('applet-2.json');
});