//grab the document
$(document).ready(function() {
    console.log("first");
    //act when earthquake button clicked
    $('#earthquakes').click(function () {
                //json for all equakes for past 30 days above 2.5
                var equakeUrl= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson";
                console.log("second");
                //go through each item on url
                $.getJSON(equakeUrl, function(data) {
                    var output = "";
                    //need to work on this
                    $.each(data, function(key, val) {
                        var features = data.features;

                        features.forEach(function(feature) {
                            //stack overflow
                            var longitude=feature.geometry.coordinates[0];
                            var latitude=feature.geometry.coordinates[1];
                            function getDistanceFromLatLonInKm(latitude, longitude) {
                                  var R = 3959; // Radius of the earth in miles
                                  var dLat = deg2rad(latitude-40.802222);  // deg2rad below
                                  var dLon = deg2rad(longitude-(-124.1625)); 
                                  var a = 
                                    Math.sin(dLat/2) * Math.sin(dLat/2) +
                                    Math.cos(deg2rad(40.802222)) * Math.cos(deg2rad(latitude)) * 
                                    Math.sin(dLon/2) * Math.sin(dLon/2); 
                                  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                                  var distance = R * c; // Distance in mi
                                  distance=distance.toFixed(2);
                                  if (distance<=100 && feature.properties.mag>=2.9) {
                                    console.log(feature.properties.place);
                                    console.log(distance,"mi");
                                    console.log(feature.properties.mag);
                                  }
                                  return distance;
                                }

                                function deg2rad(deg) {
                                  return deg * (Math.PI/180)
                                }
                            getDistanceFromLatLonInKm(latitude, longitude);
                            //if (feature.geometry.coordinates[0] <= 0) {
                            //console.log(feature.geometry.coordinates[2])
                                //}
                            });
                        //titleName = val.properties.title;

                        //output += index[1].bbox + ": " + node + "<br/>";
                            });
                    console.log("+++++",location);
                    
                    //console.log("****",titleName);
                });
           });     
        });

    

    