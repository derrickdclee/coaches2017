var map;
var locations, info, autocomplete_array;
var markers, markerCluster;
var lastOpenedInfowindow;

var center_location = {lat: 36.079140, lng: 127.587352}; // a random location for the map to be centered on
var sw_corner = {lat: 32.809278, lng: 124.579844};
var ne_corner = {lat: 39.056587, lng: 131.468266};

// test 주소 서울 종로구 창경궁로 112-15
function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: center_location
    });
    // bounds = new google.maps.LatLngBounds(sw_corner, ne_corner);
    // map.fitBounds(bounds);
    locations = [];
    info = [];
    autocomplete_array = [];

    $.getJSON('/json/results.json', function(data) {
        $.each(data, function(key, val) {
          locations.push(val);
          info.push(val.name + "/" + val.local_name + "/" + val.address);
          autocomplete_array.push(val.name);
          autocomplete_array.push(val.local_name);
        });

        // Create an array of alphabetical characters used to label the markers.
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        // Add some markers to the map.
        // Note: The code uses the JavaScript Array.prototype.map() method to
        // create an array of markers based on a given "locations" array.
        // The map() method here has nothing to do with the Google Maps API.
        markers = locations.map(function(location, i) {
            var infowindow = new google.maps.InfoWindow({
                content: info[i]
            });

            var marker = new google.maps.Marker({
                position: location.coordinates,
                label: labels[i % labels.length],
                map: map,
                names: [location.name.toLowerCase(), location.local_name],
                infowindow: infowindow
            });

            marker.addListener('click', function() {
                map.setCenter(this.getPosition());
                map.setZoom(17);
                openInfowindow(infowindow, this);
            });

            return marker;
        });

        // if a user clicks on the map, then close the last opened infowindow
        map.addListener('click', function() {
            if (lastOpenedInfowindow) {
                lastOpenedInfowindow.close();
            }
        });

        //Add a marker clusterer to manage the markers.
        markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}
        );

    });

    // search for a specific box by its name
    var finderControlDiv = $('<div></div>');
    var finderControl = new FinderControl(finderControlDiv, map);
    finderControl.index = 3;
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(finderControlDiv[0]);

    // center the map on Seoul
    var centerControlDiv = $('<div></div>');
    var centerControl = new CenterControl(centerControlDiv, map);
    centerControlDiv.index = 1;
    // "centerControlDiv" wouldn't work here, we need to pass the native DOM element!
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv[0]);

    // renders the "search by radius" control
    var searchControlDiv = $('<div></div>');
    var searchControl = new SearchControl(searchControlDiv, map);
    searchControl.index = 2;
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(searchControlDiv[0]);
}

function FinderControl(controlDiv, map) {
    var searchForm = $('<form></form>');
    var searchBox = $('<input />');
    searchBox.attr('type', 'text');
    searchBox.attr('placeholder', 'Enter your search here');
    var submitBtn = $('<input type="submit" />');
    searchForm.append(searchBox);
    searchForm.append(submitBtn);

    searchForm.appendTo(controlDiv);

    searchBox.autocomplete({
        source: autocomplete_array,
        select: function(event, ui) {
            findTheBox(ui.item.value);
            ui.item.value = '';
        }
    });

    // when the user submits
    searchForm.on('submit', function(e) {
        e.preventDefault();
        findTheBox(searchBox.val());
        searchBox.val('');
    });
}

function findTheBox(boxname) {
    markerCluster.clearMarkers();
    markerCluster.addMarkers(markers);
    var boxname_lower = boxname.toLowerCase();
    for (var i = 0; i < markers.length; i++) {
        var currentMarker = markers[i];
        var names = currentMarker.names;
        if (names[0].includes(boxname_lower) || names[1].includes(boxname_lower)) {
            map.setCenter(markers[i].getPosition());
            map.setZoom(17);
            openInfowindow(currentMarker.infowindow, currentMarker);
            return;
        }
    }
    alert('No box found!');
}

function openInfowindow(infowindow, marker) {
    if (lastOpenedInfowindow) {
        lastOpenedInfowindow.close();
    }
    infowindow.open(map, marker);
    lastOpenedInfowindow = infowindow;
}

/*
* CenterControl
*/
function CenterControl(controlDiv, map) {

  // Set CSS for the control border.
  var controlUI = $('<div></div>');
  controlUI.css('backgroundColor', '#fff');
  controlUI.css('border','2px solid #fff');
  controlUI.css('borderRadius','3px');
  controlUI.css('boxShadow', '0 2px 6px rgba(0,0,0,.3)');
  controlUI.css('cursor', 'pointer');
  controlUI.css('marginBottom','22px');
  controlUI.css('textAlign', 'center');
  controlUI.attr('title', 'Click to recenter the map');
  controlDiv.append(controlUI);

  // Set CSS for the control interior.
  var controlText = $('<div></div>');
  controlText.css('color', 'rgb(25,25,25)' );
  controlText.css('fontFamily', 'Roboto,Arial,sans-serif');
  controlText.css('fontSize', '16px');
  controlText.css('lineHeight','38px');
  controlText.css('paddingLeft', '5px');
  controlText.css('paddingRight' , '5px');
  controlText.text('Center Map');
  controlUI.append(controlText);

  // Setup the click event listeners: simply center the map.
  controlUI.on('click', function() {
    if (lastOpenedInfowindow) {
        lastOpenedInfowindow.close();
    }
    map.setCenter(center_location);
    map.setZoom(7);
  });

}

/*
* SearchControl
*/
function SearchControl(controlDiv, map) {
    var searchForm = $('<form></form>');
    var searchBox = $('<input />');
    searchBox.attr('type', 'text');
    searchBox.attr('placeholder', 'Enter your search here');
    var submitBtn = $('<input type="submit" />');
    searchForm.append(searchBox);
    searchForm.append(submitBtn);

    searchForm.appendTo(controlDiv);

    // slider for distance input
    var mySlider = $('<div></div>');
    var handle = $('<div></div>');
    handle.addClass('ui-slider-handle');
    handle.appendTo(mySlider);

    mySlider.slider({
        value: 5,
        min: 5,
        max: 30,
        step: 5,
        create: function() {
            handle.text($(this).slider('value'));
        },
        slide: function(event, ui) {
            handle.text(ui.value);
        }
    });
    mySlider.appendTo(controlDiv);

    var resetBtn = $('<button type="button">Reset</button>');
    resetBtn.appendTo(controlDiv);

    resetBtn.on('click', function() {
        markerCluster.clearMarkers();
        markerCluster.addMarkers(markers);
    });

    // when the user submits
    searchForm.on('submit', function(e) {
        e.preventDefault();
        markerCluster.clearMarkers();
        markerCluster.addMarkers(markers);
        showBoxWithinDistance(searchBox.val(), mySlider.slider('value'));
        searchBox.val('');
    });
}

function showBoxWithinDistance(address, distance) {
    var formattedAddress = encodeURIComponent(address);
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + formattedAddress;
    $.get(url, function(data) {
        var coor_obj = data.results[0].geometry.location;
        drawNewMap(coor_obj, distance);
    });
}

function drawNewMap(coor_obj, distance) {
    markerCluster.clearMarkers();
    markerCluster.addMarkers(markers);

    markers.forEach(function(marker) {
        var marker_position_obj = {
          lat: marker.getPosition().lat(),
          lng: marker.getPosition().lng()
        };

        if (getDistance(marker_position_obj, coor_obj) > distance * 1000) {
            markerCluster.removeMarker(marker);
        }
    });

   map.setCenter(coor_obj);
   var zoomlevel;
   switch (distance) {
        case 5:
            zoomlevel = 13;
            break;
        case 10:
            zoomlevel = 12;
            break;
        case 15:
            zoomlevel = 11;
            break;
        case 20:
            zoomlevel = 10;
            break;
        case 25:
            zoomlevel = 9;
            break;
        case 30:
            zoomlevel = 8;
            break;
   }
   map.setZoom(zoomlevel);
}

// implementation of the "Haversine" formula
function getDistance(location1, location2) {
    var R = 6371e3; // metres
    var p1 = toRadians(location1.lat);
    var p2 = toRadians(location2.lat);
    var d_p = toRadians(location2.lat-location1.lat);
    var d_l = toRadians(location2.lng-location1.lng);

    var a = Math.sin(d_p/2) * Math.sin(d_p/2) +
            Math.cos(p1) * Math.cos(p2) *
            Math.sin(d_l/2) * Math.sin(d_l/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;

    return d;
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}
