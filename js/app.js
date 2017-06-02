//lovedOnes are variables for key locations to know in event of earthquake
var lovedOnes = [{
  name: "Ken&Marita",
  imgSrc: "https://maps.googleapis.com/maps/api/streetview?size=400x300&location=65%20osprey%20ln,%20eureka,%20ca&key=AIzaSyCfdGqmImcOQibTI0v9_rBmj91RV4cI8SE",
  nicknames: ["Home"],
  hours: "Mon-Tue: 5pm-8am Wed-Fri: 24X7 Sat-Sun: 24X7",
  building: "Ken&Marita House<br/>Built: 2008<br/>Foundation Type: Perimeter<br/>Largest Quake: 6.5",
  location: [40.763027, -124.151345]
}, {
  name: "Pat&Carmela",
  imgSrc: "https://maps.googleapis.com/maps/api/streetview?size=400x300&location=2340%2017th%20st,%20eureka,%20ca&key=AIzaSyCfdGqmImcOQibTI0v9_rBmj91RV4cI8SE",
  nicknames: ["In-Laws"],
  hours: "Mon-Sun: 24X7",
  building: "Pat&Carmela House<br/>Built: 1904<br/>Foundation Type: Pillar&Post<br/>Largest Quake: 7.3",
  location: [40.79292, -124.142186]
}, {
  name: "Eureka Payments",
  imgSrc: "https://maps.googleapis.com/maps/api/streetview?size=400x300&location=515%20j%20st,%20eureka,%20ca&key=AIzaSyCfdGqmImcOQibTI0v9_rBmj91RV4cI8SE",
  nicknames: ["Ken's Work"],
  hours: "Mon-Fri:  8am -5pm",
  building: "Eureka Payments<br/>Built: 1987<br/>Foundation Type: Slab<br/>Largest Quake: 7.2",
  location: [40.802028, -124.161238]
}, {
  name: "Eureka High School",
  imgSrc: "https://maps.googleapis.com/maps/api/streetview?size=400x300&location=1916%20j%20st,%20eureka,%20ca&key=AIzaSyCfdGqmImcOQibTI0v9_rBmj91RV4cI8SE",
  nicknames: ["Elliott's School"],
  hours: "Mon-Fri: 8am-3pm",
  building: "EHS<br/>Built: 1925<br/>Foundation Type: Perimeter<br/>Largest Quake: 7.2",
  location: [40.790379, -124.158875]
}, {
  name: "Cutten School",
  imgSrc: "https://maps.googleapis.com/maps/api/streetview?size=400x300&location=4182%20walnut%20dr,eureka,%20ca&key=AIzaSyCfdGqmImcOQibTI0v9_rBmj91RV4cI8SE",
  nicknames: ["Marita's Work"],
  hours: "Mon-Tue: 7:30am-4:00 pm",
  building: "Cutten School<br/>Built: 1979<br/>Foundation Type: Portables<br/>Largest Quake: 7.2",
  location: [40.766483, -124.143925]
}];

var checkEqual;
//json for all equakes for past 30 days
var equakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
//variable which provides distance in miles between quake and eureka
var distance;
//variable which provides magnitude of earthquake
var quakeTitle;
//var which provides the location relative to a city (not lat/lng)
var quakeCity;
//array lat and lng of earthquakes
var quakePlace = [];
//array created by concatinating quakePlace but not duplicating
var quakeLocations = [];
//var created for ko observable array
var hotSpots;

//how to calc distance.  From stack overflow
//needed so i could find equakes within specific distance of eureka
function getDistanceFromLatLon(latitude, longitude) {
  var R = 3959; // Radius of the earth in miles
  var dLat = deg2rad(latitude - 40.802222);
  var dLon = deg2rad(longitude - (-124.1625));
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(40.802222)) * Math.cos(deg2rad(latitude)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  distance = R * c; // Distance in mi
  distance = distance.toFixed(2);
  return distance;
}

//this is also from stack overflow&needed to activate
//getDistanceFromLatLon function
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

//this loads equake data into quakeModel.hotSpots to use in viewModel
function loadArray(quakeMarker, latitude, longitude) {
  var quake = {};
  quake.marker = quakeMarker;
  quake.title = quakeTitle;
  quake.city = quakeCity;
  quake.latitude = latitude;
  quake.longitude = longitude;
  // added isVisible property to track visible state of marker
  quake.isVisible = ko.observable(true);
  // push quake in to hotSpots observable array
  quakeModel.hotSpots.push(quake);
}

/*//determines if quakePlace is a subset of quakeLocations
//commented out given checkDups funtion below. left here for future reference
//eliminates duplicate equakes based on long, lat.
function isEqual(quakePlace, quakeLocations) {
  for (var j = 0; j <= quakeLocations.length; ++j) {
    if (quakePlace[0] === quakeLocations[j] &&
      quakePlace[1] === quakeLocations[j + 1]) {
      var checkEqual = "0";
    }
    var checkEqual = "1";
  }
  return;
}*/

// function to check for duplicate quakes 
//i couldnt figure this out without help from sara m in 1 on 1
//I had above isEqual but this is way better
function checkDups(quakeTitle, quakePlace) {
  var duplicate = false;
  quakeModel.hotSpots().forEach(function(quake) {
    if (quake.title === quakeTitle && quakePlace[0] === quake.latitude && quakePlace[1] === quake.longitude) {
      duplicate = true;
    }
  });
  return duplicate;
}
//event listener.  Will indicate quake magnitude & location when clicked
function attachQuakeWindow(quakeMarker, quakeTitle, quakePosition) {
  var quakeInfowindow = new google.maps.InfoWindow({
    content: quakeCity.toString(),
    position: quakePosition
  });
  quakeMarker.addListener('click', function() {
    var quakeMarker = new google.maps.Circle({
      visible: false
    });
    var quakeMarker = new google.maps.Circle({
      strokeColor: 'blue',
      strokeWeight: 10,
      fillColor: 'blue',
      map: ekaMap,
      center: quakePosition,
      radius: quakeTitle * 10000 / 5,
      strokeOpacity: 2
    });
    ekaMap.setZoom(9);
    attachQuakeWindow(quakeMarker, quakeTitle, quakePosition);
    quakeInfowindow.open(ekaMap, quakeMarker);
  });
}
var ekaMap;
// initialize the map
function initMap() {
  // create map
  ekaMap = new google.maps.Map(document.getElementById('ekaMap'), {
    center: {
      lat: 40.802222,
      lng: -124.1625
    },
    mapTypeControl: false
  });
  //create pin drops and names when hovered over
  for (var i = 0; i < lovedOnes.length; i++) {
    // Get the position from the location array.
    var position = {
      lat: lovedOnes[i].location[0],
      lng: lovedOnes[i].location[1]
    };
    var title = lovedOnes[i].name;
    //default pin color is red.  Mouse over color is yellow
    var defaultPin = makeMarkerIcon('FF0065');
    var highlightPin = makeMarkerIcon('FFFF30');
    //when pin is clicked it changes color
    var bluePin = makeMarkerIcon('0065ff');
    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
      map: ekaMap,
      position: position,
      title: title,
      icon: defaultPin,
      animation: google.maps.Animation.DROP,
      id: i
    });
    lovedOnes[i].marker = marker;
    attachInfoWindow(marker, lovedOnes[marker.id].building);
    //higlights Pin when moused-over
    marker.addListener('mouseover', function() {
      this.setIcon(highlightPin);
    });
    //un-highlights PIN when mouseout
    marker.addListener('mouseout', function() {
      this.setIcon(defaultPin);
    });
  }
  //create function so info window may be opened at each Pin
  function attachInfoWindow(marker, building) {
    var infowindow = new google.maps.InfoWindow({
      content: building
    });
    marker.addListener('click', function() {
      //zooms in when clicking at pinDrops
      ekaMap.setZoom(11);
      this.setIcon(bluePin);
      infowindow.open(marker.get('ekaMap'), marker);
    });
  }
  // This function takes in a COLOR, and then creates a new marker
  // icon of that color. The icon will be 21 px wide by 34 high, 
  //have an origin of 0, 0 and be anchored at 10, 34)
  //took this function from class
  function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
      'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' +
      markerColor +
      '|40|_|%E2%80%A2',
      new google.maps.Size(21, 34),
      new google.maps.Point(0, 0),
      new google.maps.Point(10, 34),
      new google.maps.Size(21, 34));
    return markerImage;
  }
  //activates function and goes through list
  lovedOnes.forEach(function(locationItem) {
    quakeModel.careList.push(new pinDrop(locationItem));
  });
  
}

var pinDrop = function(data) {
  this.name = ko.observable(data.name);
  this.imgSrc = ko.observable(data.imgSrc);
  this.alternative = ko.observable(data.alternative);
  this.nicknames = ko.observableArray(data.nicknames);
  this.hours = ko.observable(data.hours);
  this.building = ko.observable(data.building);
  this.marker = ko.observable(data.marker);
  this.location = ko.observableArray(data.location);
};

//inspired by stack overflow
var earthquake;
//go through each item on url
$.getJSON(equakeUrl, function(data) {
  //go through each item in equakeURL
  $.each(data, function(key, val) {
    var features = data.features;
    features.forEach(function(feature) {
      //get longitude of equake
      var longitude = feature.geometry.coordinates[0];
      //get latitude of equake
      var latitude = feature.geometry.coordinates[1];
      //how to calc distance from eureka.  From stack overflow
      getDistanceFromLatLon(latitude, longitude);
      //only select if within 50 mi & greater than 2.0 magnitude
      //might need to lower mag or increase distance to ensure i have 5 pts
      if (distance <= 50 && feature.properties.mag >= 2.0) {
        var quakePosition = {
          lat: latitude,
          lng: longitude
        };
        //location in longitude and latitude
        quakePlace = [quakePosition.lat, quakePosition.lng];
        //calls function to determine if we already have quakePlace Location
        if (checkEqual == undefined || checkEqual == 0) {
          //get magnitude and city description of quake          
          quakeTitle = (feature.properties.mag);
          quakeCity = (feature.properties.title);
          //arrange in an array and eliminate duplicates
          //determine if quakePlace is a duplicate location
          if (!checkDups(quakeTitle, quakePlace)) {
            //resets zoom to account for distance of equakes to eureka
            ekaMap.setZoom(9);
            //makes quake circle.  Size relative to magnitude of equake
            var quakeMarker = new google.maps.Circle({
              strokeColor: '#FF0000',
              strokeWeight: 6,
              fillColor: 'green',
              map: ekaMap,
              center: quakePosition,
              radius: quakeTitle * 10000 / 7,
              strokeOpacity: 1.0
            });
            attachQuakeWindow(quakeMarker, quakeTitle, quakePosition);
            loadArray(quakeMarker, latitude, longitude);
          }
        };
      }
    });
  });

  //ensures USGS URL is valid
  //error handling in case URL for USGS not loading
}).fail(function() {
  mapError();
});


//manages oneerror error
function mapError() {
  alert('The image could not be loaded. ' +
    'For the love of God I hope it was not because of an earthquake');
}
//viewModel inspired by KO tutorials and class lecture
function ViewModel() {
  var self = this;
  self.folders = lovedOnes;
  //initial value to show first item in lovedOnes

  self.careList = ko.observableArray([]);
  self.selectedOne = ko.observable();
  //had to move this variable up as hoisting doesnt work same in KO
  self.hotSpots = ko.observableArray([]);

  //creates observable for each location in list and calc initial observable
  self.setSelectedOneToFirstCareItem = ko.computed(function() {
    return self.selectedOne(self.careList()[0]);;
  });self.selectedOne(self.careList()[0]);
  

  //refers to specific pin drop location
  self.lovedOne = function(clickedOne) {
    self.selectedOne(clickedOne);
    google.maps.event.trigger(clickedOne.marker(), 'click', {});
  };

  self.largeQuakes = function() {
    self.hotSpots().forEach(function(spot) {
      if (spot.title < 2.50) {
        spot.isVisible(false);
        spot.marker.setVisible(false);
        quakeMarker = new google.maps.Circle({
          visible: false
        });
        ekaMap.setZoom(9);
      } else {
        spot.isVisible(true);
        spot.marker.setVisible(true);
      }
    });
    return;

  };

  self.earthQuakes = function() {
    self.hotSpots().forEach(function(spot) {
      spot.isVisible(true);
      spot.marker.setVisible(true);
      ekaMap.setZoom(9);
    })
    return;
  };

  self.showInfo = function(quakeVar) {
    google.maps.event.trigger(quakeVar.marker, 'click', {});
  };
}

var quakeModel = new ViewModel();
//apply bindings to ViewModel
ko.applyBindings(quakeModel);