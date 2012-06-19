google.maps.event.addDomListener(window, 'load', initialize);

var continental_map;
var hawaii_map;
var alaska_map;

/* Creates Maps, Markers and Adds Event Listeners on body load*/
function initialize() {
	initializeMaps();
	
	var popup = createInfoPane();
	
	overlayStates(popup);
}

/* Creates 3 Maps for U.S. States (Continental, Hawaii and Alaska) */
function initializeMaps(){
	var style = [{
				featureType: "all",
				stylers: [{saturation: -80}]
				},
				{
				featureType: "water",
				stylers: [{saturation: 40}]
				},
				{
				featureType: "administrative.country",
				stylers: [{visibility: 'off'}]
				}]
				
	var myOptions = {
	  center: new google.maps.LatLng(37,-102),
	  zoom: 4,
	  mapTypeId: google.maps.MapTypeId.ROADMAP,
	  styles: style,
	  disableDefaultUI: true,
	  draggable: false,
	  disableDoubleClickZoom: true
	};
	
	continental_map = new google.maps.Map(document.getElementById("continental"),
		myOptions);
	
	/* Add Listener to Map 'Changed Center' Event */
	google.maps.event.addListener(continental_map, 'center_changed', 
		function() { 
			returnMaptoLocation(continental_map, myOptions.center, 3000)
	});
	
	myOptions.center = new google.maps.LatLng(20.5,-157.5);
	myOptions.zoom = 5;
	
	hawaii_map = new google.maps.Map(document.getElementById("hawaii"),
		myOptions);
	
	myOptions.center = new google.maps.LatLng(64,-154);
	myOptions.zoom = 2;
	
	alaska_map = new google.maps.Map(document.getElementById("alaska"),
		myOptions);
		
}

function createInfoPane(){
	var popup = $(document.createElement("span"))
							.attr('id', 'info_container')
							.hide();
	
	var header = $(document.createElement("div"))
							.attr('id', 'info_header');
	
	var exit = $(document.createElement("span"))
							.attr('id', 'info_exit')
							.click(function(){
								$(popup).hide();
							});
							
	var content = $(document.createElement("div"))
							.attr('id', 'info_content');
	
	popup.append(header);
	popup.append(exit);
	popup.append(content);
	
	exit.html("X");
	
	$("#map_container").append(popup);
	
	return popup;
}

/* Overlays Polygons of State Shapes */
function overlayStates(popup){
	var polys = [];
	var labels = [];
	
	$.ajax({
			type: "GET",
			url: "states.xml",
			datatype: "xml",
			success: function(xml){
				var a = 0;
				$(xml).find("state").each(function(){
					var pts = [];
					var i = 0;
					$(this).find("point").each(function(){
						var lat = $(this).attr("lat");
						var lng = $(this).attr("lng");
						
						pts[i] = new google.maps.LatLng(lat, lng);
						
						i++;
					});
					
					var stateName = $(this).attr("name");
					var stateNick = $(this).attr("nick");
					
					labels[a] = {
								name: stateName,
								nick: stateNick
								};
					
					
					polys[a] = new google.maps.Polygon({
						paths: pts,
						strokeColor: "#FF0000",
						strokeOpacity: 0.8,
						strokeWeight: 2,
						fillColor: "#FF0000",
						fillOpacity: 0.35
					});
					
					/* Add Listener to Map 'Clicked' Event <MOVE TO STATES> */
					google.maps.event.addListener(polys[a], 'click', 
						function(event) { 
							$(popup).show();
							$(popup).find("#info_header").html(stateName);
							/* Retrieve XML Document of Congressman Information */
							$.ajax({
									type: 	"GET",
									url: 	"helper/RetrieveXML.php?url=http://www.senate.gov/general/contact_information/senators_cfm.xml",
									datatype: "xml",
									success: function(xml){
										$(popup).find("#info_content").html("");
										$(xml).find("member").each(function(){
											if($(this).find('state').text() == stateNick){
												var datarow = $(document.createElement('div'))
																		.attr('class', 'datarow')
												
												var name = $(this).find('first_name').text()+" "+$(this).find('last_name').text();
												var phone = $(this).find('phone').text();
												var address = $(this).find('address').text();
												var emailLink = $(this).find('email').text();
												var website = $(this).find('website').text();
												var party = $(this).find('party').text();
												
												datarow.append(name+"  "+phone+"  "+address+" <a href='emailLink'>Email</a> ");
												$(popup).find("#info_content").append(datarow);
											}
										});										
									}
							});
							
					});
					
					if($(this).attr("nick") == "HI"){
						polys[a].setMap(hawaii_map);
					}else if($(this).attr("nick") == "AK"){
						polys[a].setMap(alaska_map);
					}else{
						polys[a].setMap(continental_map);
					}
					
					a++;
				});
			}
	});
}


/* Returns the Map to the Marker specified after a specified length of time */
function returnMaptoMarker(map, marker, timeout){
	window.setTimeout(function() {
			continental_map.panTo(marker.getPosition());
		}, timeout);
}

/* Place Marker at Location */
function placeMarker(map, location){
	var marker = new google.maps.Marker({
										position: location,
										map: map
	});
	
}

/* Place Info Window at Location with the Content specified */
function placeInfoWindow(content, map, location){
	var infowindow = new google.maps.InfoWindow({
												content: content,
												position: location
	});
	
	infowindow.open(map);
}
