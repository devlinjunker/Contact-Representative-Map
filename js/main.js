google.maps.event.addDomListener(window, 'load', initialize);

var continental_map;
var hawaii_map;
var alaska_map;

/* Creates 3 Maps for U.S. States (Continental, Hawaii and Alaska) */
function initializeMaps(){
	var myOptions = {
	  center: new google.maps.LatLng(39,-102),
	  zoom: 4,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	continental_map = new google.maps.Map(document.getElementById("continental"),
		myOptions);
	
	var myOptions = {
	  center: new google.maps.LatLng(21,-159),
	  zoom: 4,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	hawaii_map = new google.maps.Map(document.getElementById("hawaii"),
		myOptions);
	
	var myOptions = {
	  center: new google.maps.LatLng(64,-154),
	  zoom: 2,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	alaska_map = new google.maps.Map(document.getElementById("alaska"),
		myOptions);
}

/* Creates Maps, Markers and Adds Event Listeners on body load*/
function initialize() {
	initializeMaps();
	
	var marker = new google.maps.Marker({
										position:continental_map.getCenter(),
										map: continental_map,
										title: 'Click Me'
	});

	google.maps.event.addListener(continental_map, 'center_changed', 
		function() { 
			returnMaptoMarker(continental_map, marker, 3000)
	});
	
	google.maps.event.addListener(continental_map, 'click', 
		function(event) { 
			placeMarker(continental_map, event.latLng)
	});
	
	placeInfoWindow("Test", continental_map, new google.maps.LatLng(30, -102));
	
	$.ajax({
			type: 	"GET",
			url: 	"helper/RetrieveXML.php?url=http://www.senate.gov/general/contact_information/senators_cfm.xml",
			datatype: "xml",
			success: function(xml){
				alert(xml);		
			}
	});
}

function returnMaptoMarker(map, marker, timeout){
	window.setTimeout(function() {
			continental_map.panTo(marker.getPosition());
		}, timeout);
}

function placeMarker(map, location){
	var marker = new google.maps.Marker({
										position: location,
										map: map
	});
	
}

function placeInfoWindow(content, map, location){
	var infowindow = new google.maps.InfoWindow({
												content: content,
												position: location
	});
	
	infowindow.open(map);
}