//grab the document
$(document).ready(function() {
    console.log("first");
    //act when earthquake button clicked
    $('#earthquakes').click(function () {
                var equakeUrl= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
                console.log("second");
                //go through each item on url
                $.getJSON(equakeUrl, function(data) {
                    var output = "";
                    //need to work on this
                    $.each(data, function(index, node) {
                        output += index + ": " + node + "<br/>";
                            });
                    document.write(output);
           });     
        })




                
    })
    