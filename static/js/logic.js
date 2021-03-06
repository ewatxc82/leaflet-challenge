var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 10,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

//Adding variable for the map
var myMap = L.map("map", {
  center: [
    35.393528, -119.043732
  ],
  zoom: 7,

});

streetmap.addTo(myMap);

//Add endpoint inside the url query
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
d3.json(queryUrl, function(data) {

//creating 3 different functions for style, coloring, and radius of the elements
  function mapStyle(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: mapColor(feature.properties.mag),
      color: "#000000",
      radius: mapRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }
  //color function
  function mapColor(mag){
    switch (true) {
      case mag > 5:
        return "#FF0000";
      case mag > 4:
        return "#D2691E";
      case mag > 3:
        return "0000FF";
      case mag > 2:
        return "8A2BE2";
      case mag > 1:
        return "#7FFF00";
      default:
        return "#2c99ea";        
    }
  }

  function mapRadius(mag) {
    if (mag === 0) {
      return 1;
    }

    return mag * 4;
  }


  L.geoJson(data, {

    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },

    style: mapStyle,

    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);

    }
  }).addTo(myMap);

  //adding legend
  var legend = L.control({
    position: "bottomright"
  });

  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");

    var grades = [0, 1, 2, 3, 4, 5];
    var colors = ["#2c99ea", "#7FFF00", "#8A2BE2", "#0000FF","#D2691E", "#FF0000"];


    //loop through the intervals of the colors to put them in the label
    for (var i = 0; i<grades.length; i++) {
      div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    }
    return div;

  };

  legend.addTo(myMap)
  
});