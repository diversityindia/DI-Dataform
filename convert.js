var map, vectors, controls;
map = new OpenLayers.Map("map");
    map.addLayer(new OpenLayers.Layer.OSM());
    map.addControl(new OpenLayers.Control.LayerSwitcher());
    map.addControl(new OpenLayers.Control.MousePosition());
    map.zoomToMaxExtent();
       var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
        var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
        var position       = new OpenLayers.LonLat(77.8719, 22.4648).transform( fromProjection, toProjection);
         var zoom           = 4; 
    map.setCenter(position, zoom );
    map.events.register("click", map, function(e) {
      var position = map.getLonLatFromPixel(e.xy);
    var lonlat= new OpenLayers.LonLat(position.lon,position.lat).transform(toProjection,fromProjection);
      OpenLayers.Util.getElement("long").value =
         lonlat.lon ;
     OpenLayers.Util.getElement("lat").value=lonlat.lat;
    });


 controls = {
      
      point: new OpenLayers.Control.DrawFeature(vectors,
      OpenLayers.Handler.Point),
    
      line: new OpenLayers.Control.DrawFeature(vectors,
      OpenLayers.Handler.Path),
      polygon: new OpenLayers.Control.DrawFeature(vectors,
      OpenLayers.Handler.Polygon),
      drag: new OpenLayers.Control.DragFeature(vectors)
      };
//map.setCenter(new OpenLayers.LonLat(77.8719, 22.4648), 3);


function gformat(form) {
  if(((form.place.value!="")&& (form.clickdate.value!="")))
  {
    var idstring ="#####"+"\n"+"# ScName :"+form.scname.value+"\n"+"# Cname :"+form.cname.value+"\n"+"# Place :"+form.place.value+"\n"+"# Date :"+form.clickdate.value+"\n"+"# Lat :"+form.lat.value+"\n"+"# Long :"+form.long.value+"\n"+"# Id Source :"+form.idsource.value+"\n"+"###"+"\n"+form.photolink.value;  
    if (document.getElementById("idhelp").checked)
      idstring = "Please help me with identification" +"\n"+ idstring;
    $("#format").val(idstring)
  }
  else{
    if (form.place.value=="") 
      alert("Please enter the place the specimen was found at.");
    if(form.clickdate.value=="")
      alert("Please enter the date the specimen was found.");
  }
}

function gformatJson(form){
  if(((form.place.value!="")&& (form.clickdate.value!="")))
  {
    var idstring ="{"+"\n"+" \"ScName\":\""+form.scname.value+"\","+"\n"+"\"Cname\":"+"\""+form.cname.value+"\","+"\n"+"\"Place\" :"+"\""+form.place.value+"\","+"\n"+"\"Date\" :"+"\""+form.clickdate.value+"\","+"\n"+"\"Lat\" :"+"\""+form.lat.value+"\","+"\n"+"\"Long\":"+"\""+form.long.value+"\","+"\n"+"\"idsource\" :"+"\""+form.idsource.value+"\","+"\n"+"\"photolink\":"+"\""+form.photolink.value+"\""+"\n"+"}"
    if (document.getElementById("idhelp").checked)
      idstring = "Please help me with identification" +"\n"+ idstring;
    $("#format").val(idstring)
  }
  else{
    if (form.place.value=="") 
      alert("Please enter the place the specimen was found at.");
    if(form.clickdate.value=="")
      alert("Please enter the date the specimen was found.");
  }
}