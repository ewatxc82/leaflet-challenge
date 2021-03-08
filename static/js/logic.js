//Creating variable to query the url
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";

d3.json(queryUrl);


//Adding variable for the map
var myMap = L.map("mapid", {
    center: [15.5994, -28.6731],
    zoom: 3
  });

var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 10,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

streetmap.addTo(myMap);

//Add endpoint inside the url query
var urlQuery = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
d3.json(queryUrl, function(data){
  
  //creating 3 different functions for style, coloring, and radius of the elements
  function mapStyle(feature){
    return{
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
  
})

