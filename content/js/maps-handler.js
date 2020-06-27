var requestedMarker,directionsDisplayMap,directionsServiceMap,map,directionsDisplay,currentLocation,app=new appExec;function multipleRouteHide(){directionsDisplayMap.setMap(null)}function renderDirectionsPolylines(e,t){var o=new google.maps.LatLngBounds,n=[{icons:[{icon:{path:0,scale:3,fillOpacity:.7,fillColor:"#707070",strokeOpacity:.8,strokeColor:"#707070",strokeWeight:1},repeat:"10px"}],strokeColor:"#000000",strokeOpacity:0,strokeWeight:5},{strokeColor:"#FFD300",strokeWeight:5}],s=e.routes[0].legs;for(i=0;i<s.length;i++){var a=s[i].steps;for(j=0;j<a.length;j++){var r=a[j].path,l=new google.maps.Polyline(i>0?n[1]:n[0]);for(k=0;k<r.length;k++)l.getPath().push(r[k]),o.extend(r[k]);l.setMap(t)}}}function fromSetRouteToAddRoute(){$(".title").text("Hacia donde viajas"),$(".back-to-map").addClass("hidden")}const startCoord={latitud:8.42729,longitud:-82.4308472,position:[]};async function getLocation(){const e=await app.currentPosition();console.log(e);var t=e.coords.latitude,o=e.coords.longitude;startCoord.latitud=t,startCoord.longitud=o,cookie.set("currentPosition",JSON.stringify(startCoord),1),app.addMarkers({lat:t,lng:o},"../images/icons8-user-location-40.png","Urbanizacion La Foresta","l",!0)}function hideMapRequestPin(){requestedMarker.setVisible(!1),$(".tapped-car-info").addClass("hidden")}function showMapRequestPin(){var e={request:new google.maps.MarkerImage("../icons/car-start-position.svg",new google.maps.Size(36,28),new google.maps.Point(0,0),new google.maps.Point(0,8),new google.maps.Size(36,28))};app.addMarkers({lat:42.274006,lng:-71.810181},e.request,"Request Pin",!1),setTimeout(function(){$("img[src='../icons/car-start-position.svg']").parent().hasClass("pulse")||$("img[src='../icons/car-start-position.svg']").parent().addClass("pulse").css("opacity",1)},600)}function AutocompleteDirectionsHandler(e){this.map=e,this.originPlaceId=null,this.destinationPlaceId=null,this.travelMode="DRIVING",this.directionsService=new google.maps.DirectionsService,this.directionsDisplayMap=new google.maps.DirectionsRenderer({suppressMarkers:!0}),this.directionsDisplayMap.setOptions({polylineOptions:{strokeColor:"#FFD300",strokeWeight:5}}),this.directionsDisplayMap.setMap(e);var t=this;$(".map-input .remove").add(".submit-review .close-review").add(".submit-review .btn-primary").on("click",function(){t.directionsDisplayMap.setMap(null),"origin-input"==$(this).closest(".map-input").find("input").attr("id")?t.originPlaceId=null:t.destinationPlaceId=null});var o=document.getElementById("origin-input"),i=document.getElementById("origin-input-container"),n=document.getElementById("destination-input"),s=(document.getElementById("destination-input-container"),new google.maps.places.Autocomplete(o));s.setFields(["place_id"]);var a=new google.maps.places.Autocomplete(n);a.setFields(["place_id"]),this.setupPlaceChangedListener(s,"ORIG"),this.setupPlaceChangedListener(a,"DEST"),this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(i)}function geocodePosition(e){console.log(e),geocoder=new google.maps.Geocoder,geocoder.geocode({latLng:e},function(e,t){t==google.maps.GeocoderStatus.OK?($("#mapSearchInput").val(e[0].formatted_address),$("#mapErrorMsg").hide(100)):$("#mapErrorMsg").html("Cannot determine address at this location."+t).show(100)})}AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener=function(e,t){var o=this;e.bindTo("bounds",this.map),e.addListener("place_changed",function(){var i=e.getPlace();if(!i.place_id)return $(".request-ride-btn").addClass("hidden"),void $(".trigger_current_position").removeClass("hidden");"ORIG"===t?o.originPlaceId=i.place_id:o.destinationPlaceId=i.place_id,o.route()})},AutocompleteDirectionsHandler.prototype.route=function(){if(!this.destinationPlaceId)return $(".request-ride-btn").addClass("hidden"),void $(".trigger_current_position").removeClass("hidden");var e=this,t=JSON.parse(cookie.get("currentPosition"));console.log(t),$(".request-ride-btn").removeClass("hidden"),$(".trigger_current_position").addClass("hidden");var o=t.latitud,i=t.longitud,n=new google.maps.LatLng(o,i),s=$("#destination-input").val();this.directionsService.route({origin:n,destination:s,travelMode:this.travelMode},function(t,o){if("OK"===o){var i={start:new google.maps.MarkerImage("../images/icons8-user-location-40.png",new google.maps.Size(26,21),new google.maps.Point(0,0),new google.maps.Point(13,16)),end:new google.maps.MarkerImage("../images/end.png",new google.maps.Size(58,53),new google.maps.Point(0,0),new google.maps.Point(22,32))};e.directionsDisplayMap.setMap(map),e.directionsDisplayMap.setOptions({polylineOptions:{strokeColor:"#000",strokeWeight:5}}),console.log(t),e.directionsDisplayMap.setDirections(t);var n=t.routes[0].legs[0];console.log(n);var s={dist:n.distance.text,time:n.duration.text};cookie.set("travelInfo",JSON.stringify(s),1),app.addMarkers(n.start_location,i.start,"Route Start"),app.addMarkers(n.end_location,i.end,"Route End"),setTimeout(function(){$("#map img[src='../icons/circle.svg']").parent().each(function(e,t){$(t).hasClass("pulse current-location")||$(t).hasClass("map-input-icon")||$(t).addClass("pulse current-location").css("opacity",1)})},600)}else window.alert("Solicitud de direcciones fallida debido a"+o)}),map.setZoom(12),$(window).trigger("resize")};var getUrlParameter=function(e){var t,o,i=window.location.search.substring(1).split("&");for(o=0;o<i.length;o++)if((t=i[o].split("="))[0]===e)return void 0===t[1]||decodeURIComponent(t[1])};