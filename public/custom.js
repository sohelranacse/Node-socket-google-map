// Make connection
var socket = io(); // io.connect('http://localhost:4001')

// map
var map, infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: 23.7940197,
            lng: 90.4056863
        },
        zoom: 12
    });
    infoWindow = new google.maps.InfoWindow(); // Try HTML5 geolocation.

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                
                /*infoWindow.setPosition(pos);
                infoWindow.setContent("Location found.");
                infoWindow.open(map);
                map.setCenter(pos);*/

                socket.emit('current_location', pos);
            },
            function () {
                handleLocationError(true, infoWindow, map.getCenter());
            }
        );
    } else {
    // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}


// broadcast content
socket.on('current_location', function(pos){
    new google.maps.Marker({
        position: pos,
        map: map
    });

    /*infoWindow.setPosition(data);
    infoWindow.setContent("Location here.");
    infoWindow.open(map);
    map.setCenter(pos);*/

});