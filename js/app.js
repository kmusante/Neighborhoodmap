//locations array of location objects
//maybe Location constructor(like Cat constructor)......karol likes but optional
//ViewModel constructor with locations observableArray
//instantiate the ViewModel using the new operator
//apply binding AKA activate K.O.
//var googleKey=AIzaSyCfdGqmImcOQibTI0v9_rBmj91RV4cI8SE;
lovedOnes=[
{
	name: "Ken&Marita",
	imgSrc: 
	"https://maps.googleapis.com/maps/api/streetview?size=400x400&location=65%20osprey%20ln,%20eureka,%20ca&key=AIzaSyCfdGqmImcOQibTI0v9_rBmj91RV4cI8SE",
	nicknames: ["Home"],
	hours: "Mon-Tue: 5pm-8am Wed-Fri: 24X7 Sat-Sun: 24X7",
	building: "1"

},{
	name:"Pat&Carmela",
	imgSrc: 
	"https://maps.googleapis.com/maps/api/streetview?size=400x400&location=2340%2017th%20st,%20eureka,%20ca&key=AIzaSyCfdGqmImcOQibTI0v9_rBmj91RV4cI8SE",
	nicknames: ["In-Laws"],
	hours: "Mon-Sun: 24X7",
	building: "2"
},{
	name: "Eureka Payments",
	imgSrc: 
	"https://maps.googleapis.com/maps/api/streetview?size=400x400&location=515%20j%20st,%20eureka,%20ca&key=AIzaSyCfdGqmImcOQibTI0v9_rBmj91RV4cI8SE",
	nicknames: ["Ken's Work"],
	hours: "Mon-Fri:  8am -5pm",
	building: "3"
},{
	name: "Eureka High School",
	imgSrc: 
	"https://maps.googleapis.com/maps/api/streetview?size=400x400&location=1916%20j%20st,%20eureka,%20ca&key=AIzaSyCfdGqmImcOQibTI0v9_rBmj91RV4cI8SE",
	nicknames: ["Elliott's School"],
	hours: "Mon-Fri: 8am-3pm",
	building: "4"
},{
	name: "Cutten School",
	imgSrc: 
	"https://maps.googleapis.com/maps/api/streetview?size=400x400&location=4182%20walnut%20dr,eureka,%20ca&key=AIzaSyCfdGqmImcOQibTI0v9_rBmj91RV4cI8SE",
	nicknames: ["Marita's Work"],
	hours: "Mon-Tue: 7:30am-4:00 pm",
	building: "5"
},{
	name: "Eureka Police Dep",
	imgSrc: 
	"https://maps.googleapis.com/maps/api/streetview?size=400x400&location=604%20c%20st,eureka,%20ca&key=AIzaSyCfdGqmImcOQibTI0v9_rBmj91RV4cI8SE",
	nicknames: ["Law Enforcement"],
	hours: "N/A",
	building: "6"
}];

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
	
//viewModel inspired by KO tutorials and class lecture
function viewModel() {
	var self = this;
    self.folders = lovedOnes;
	self.careList=ko.observableArray([]);

	lovedOnes.forEach(function(locationItem){
		self.careList.push( new pinDrop(locationItem));
	});
	
	self.selectedOne=ko.observable( this.careList()[0]);

	self.lovedOne=function(clickedOne) {
		self.selectedOne(clickedOne);
	};
};

//apply bindings to viewModel
ko.applyBindings(new viewModel());
