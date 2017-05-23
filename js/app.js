//lovedOnes are variables for key locations to know in event of earthquake
lovedOnes=[
{
	name: "Ken&Marita",
	imgSrc: 
	"https://maps.googleapis.com/maps/api/streetview?size=400x400&location=65%20osprey%20ln,%20eureka,%20ca&key=AIzaSyCfdGqmImcOQibTI0v9_rBmj91RV4cI8SE",
	nicknames: ["Home"],
	hours: "Mon-Tue: 5pm-8am Wed-Fri: 24X7 Sat-Sun: 24X7",
	building: "Ken&Marita House<br/>Built: 2008<br/>Foundation Type: Perimeter<br/>Largest Quake: 6.5"
},{
	name:"Pat&Carmela",
	imgSrc: 
	"https://maps.googleapis.com/maps/api/streetview?size=400x400&location=2340%2017th%20st,%20eureka,%20ca&key=AIzaSyCfdGqmImcOQibTI0v9_rBmj91RV4cI8SE",
	nicknames: ["In-Laws"],
	hours: "Mon-Sun: 24X7",
	building: "Pat&Carmela House<br/>Built: 1904<br/>Foundation Type: Pillar&Post<br/>Largest Quake: 7.3"
},{
	name: "Eureka Payments",
	imgSrc: 
	"https://maps.googleapis.com/maps/api/streetview?size=400x400&location=515%20j%20st,%20eureka,%20ca&key=AIzaSyCfdGqmImcOQibTI0v9_rBmj91RV4cI8SE",
	nicknames: ["Ken's Work"],
	hours: "Mon-Fri:  8am -5pm",
	building: "Eureka Payments<br/>Built: 1987<br/>Foundation Type: Slab<br/>Largest Quake: 7.2"
},{
	name: "Eureka High School",
	imgSrc: 
	"https://maps.googleapis.com/maps/api/streetview?size=400x400&location=1916%20j%20st,%20eureka,%20ca&key=AIzaSyCfdGqmImcOQibTI0v9_rBmj91RV4cI8SE",
	nicknames: ["Elliott's School"],
	hours: "Mon-Fri: 8am-3pm",
	building: "EHS<br/>Built: 1925<br/>Foundation Type: Perimeter<br/>Largest Quake: 7.2"
},{
	name: "Cutten School",
	imgSrc: 
	"https://maps.googleapis.com/maps/api/streetview?size=400x400&location=4182%20walnut%20dr,eureka,%20ca&key=AIzaSyCfdGqmImcOQibTI0v9_rBmj91RV4cI8SE",
	nicknames: ["Marita's Work"],
	hours: "Mon-Tue: 7:30am-4:00 pm",
	building: "Cutten School<br/>Built: 1979<br/>Foundation Type: Portables<br/>Largest Quake: 7.2"
},{
	name: "Eureka Police Dep",
	imgSrc: 
	"https://maps.googleapis.com/maps/api/streetview?size=400x400&location=604%20c%20st,eureka,%20ca&key=AIzaSyCfdGqmImcOQibTI0v9_rBmj91RV4cI8SE",
	nicknames: ["Law Enforcement"],
	hours: "N/A",
	building: "Eureka Police Department<br/>Rally Point"
}];
//json for all equakes for past 30 days
var equakeUrl= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
//variable which provides distance in miles between quake and eureka
var distance;
//variable which provides magnitude of earthquake
var quakeTitle;
//variable which provides location of earthquake
var shakerList;
var quakePlace;
var hotSpots=[{}];

var ekaMap;
  // initialize the map
  function initMap() {
    // create map
    ekaMap=new google.maps.Map(document.getElementById('ekaMap'),{
   	center: {lat: 40.802222, lng: -124.1625},
   	zoom: 12,
    mapTypeControl: false
    });
    //create pin drops and names when hovered over
    var locations = [
      {title: 'Ken&Marita', location: {lat: 40.763027, lng: -124.151345}},
      {title: 'Pat&Carmela', location: {lat: 40.79292, lng: -124.142186}},
      {title: 'Eureka Payments', location: {lat: 40.802028, lng: -124.161238}},
      {title: 'Eureka High School', location: {lat: 40.790379, lng: -124.158875}},
      {title: 'Cutten School', location: {lat: 40.766483, lng: -124.143925}},
      {title: 'Eureka Police Dep', location: {lat: 40.800425, lng: -124.169326}}
    ];

    for (var i = 0; i < locations.length; i++) {
      // Get the position from the location array.
      var position = locations[i].location;
      var title = locations[i].title;
      //default pin color is red.  Mouse over color is yellow
      var defaultPin = makeMarkerIcon('FF0065');
      var highlightPin=makeMarkerIcon('FFFF30');
      var bluePin=makeMarkerIcon('0065ff');
        
      // Create a marker per location, and put into markers array.
      var marker = new google.maps.Marker({
        map: ekaMap,
        position: position,
        title: title,
        icon: defaultPin,
        animation: google.maps.Animation.DROP,
        id: i
      });attachInfoWindow(marker, lovedOnes[marker.id].building);
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
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
        '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21,34));
      return markerImage;
    }
    
   }
 
var pinDrop=function(data) {
	this.name=ko.observable(data.name);
	this.imgSrc=ko.observable(data.imgSrc);
	this.alternative=ko.observable(data.alternative);
	//should likely change this back to standard observable
	this.nicknames=ko.observableArray(data.nicknames);
	this.hours=ko.observable(data.hours);
	this.building=ko.observable(data.building);

};

var rattleNRoll=function(data) {
  var self = this;
  this.quakeTitle=ko.observable(data.quakeTitle);
  this.quakePlace=ko.observable(data.quakePlace);
};

//how to calc distance.  From stack overflow
//needed so i could find equakes within specific distance of eureka
function getDistanceFromLatLon(latitude, longitude) {
	var R = 3959; // Radius of the earth in miles
	var dLat = deg2rad(latitude-40.802222);  // deg2rad below
	var dLon = deg2rad(longitude-(-124.1625)); 
	var a = 
  	Math.sin(dLat/2) * Math.sin(dLat/2) +
  	Math.cos(deg2rad(40.802222)) * Math.cos(deg2rad(latitude)) * 
  	Math.sin(dLon/2) * Math.sin(dLon/2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	distance = R * c; // Distance in mi
	distance=distance.toFixed(2);
	return distance;
}
//this is also from stack overflow&needed to activate
//getDistanceFromLatLon function
function deg2rad(deg) {
	return deg * (Math.PI/180)
}

//inspired by stack overflow
var earthquake=function() {
  ///ensures USGS URL is valid
  if (typeof(earthquake)===undefined || typeof(earthquake)===null) {
    console.log("errorr!!!");
    mapError();
    };
  //error handling in case URL for USGS not loading
  $.getJSON(equakeUrl, function(data) {
    //go through each item in equakeURL
    $.each(data, function(key, val) {
      var features = data.features;
      features.forEach(function(feature) {
        //how to calc distance.  From stack overflow
        var longitude=feature.geometry.coordinates[0];
        var latitude=feature.geometry.coordinates[1];
        });
      });
    //to handle event of USGS url fails
    }).fail(function() {
      mapError();
  });

	//go through each item on url
	$.getJSON(equakeUrl, function(data) {
    //go through each item in equakeURL
    $.each(data, function(key, val) {
      var features = data.features;
      features.forEach(function(feature) {
        //get longitude of equake
        var longitude=feature.geometry.coordinates[0];
        //get latitude of equake
        var latitude=feature.geometry.coordinates[1];
        //how to calc distance from eureka.  From stack overflow
        getDistanceFromLatLon(latitude, longitude);
        //only select if within 50 mi & greater than 2.5 magnitude
        if (distance<=50 && feature.properties.mag>=2.5) {
  				quakeTitle=(feature.properties.mag);
          quakePlace=(feature.properties.title);
          //resets zoom to account for distance of equakes to eureka
          var quakePosition = {lat: latitude, lng: longitude};
        			ekaMap.setZoom(9);
          //makes quake circle.  Size relative to magnitude of equake
  				var quakeMarker = new google.maps.Circle({
            strokeColor: '#FF0000',
      			strokeWeight: 2,
      			fillColor: 'green',
      			map: ekaMap,
      			center: quakePosition,
      			radius: quakeTitle*10000/7,
            draggable: true,
            animation: google.maps.Animation.DROP,
      			strokeOpacity: 0.1
          });attachQuakeWindow(quakeMarker, quakeTitle, quakePosition);
        }
        //event listener.  Will indicate quake magnitude 
  			function attachQuakeWindow(quakeMarker, quakeTitle, quakePosition) {
    			var quakeInfowindow = new google.maps.InfoWindow({
      			content: "magnitude "+quakeTitle.toString(),
      			position: quakePosition
    			});quakeMarker.addListener('click', function() {
              quakeInfowindow.open(ekaMap, quakeMarker);
    				});
	     	 }
			 })
      });
    });
	};
	
//manages oneerror error
function mapError() {
  alert('The image could not be loaded.  For the love of God I hope it was not because of an earthquake');
    };  
//viewModel inspired by KO tutorials and class lecture
function ViewModel() {
	var self = this;
  self.folders = lovedOnes;
	self.careList=ko.observableArray([]);

	
  lovedOnes.forEach(function(locationItem){
		self.careList.push( new pinDrop(locationItem));
	});
	
  //creates observable for each location in list
	self.selectedOne=ko.observable( this.careList()[0]);

  //refers to specific pin drop location
	self.lovedOne=function(clickedOne) {
		self.selectedOne(clickedOne);
	};


  self.shakerList=ko.observableArray([]);
  self.folders=hotSpots[quakeTitle, quakePlace];

  hotSpots.forEach(function(quakeSpot){
    self.shakerList.push( new rattleNRoll(quakeSpot));
  });
  
  self.shaker=ko.observable( this.shakerList()[0]);

  self.rattled=function(shaken) {
    self.shaker(shaken);
  }


	self.earthquakes = function() {
    earthquake();
  };
  //  self.shakerList.push(quakeTitle);
  //self.shakerlist.push(quakePlace);
  console.log(quakeTitle, "**");
  console.log(shakerList, "##");
  console.log(quakePlace);
  console.log(hotSpots);
    //console.dir(shakerList);
    //console.dir(quakePlace);
    


  //self.shakerList.push(quakeTitle);

};

//apply bindings to ViewModel
ko.applyBindings(new ViewModel());
