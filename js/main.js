function initialize() {
	var myOptions = {
	  center: new google.maps.LatLng(-34.397, 150.644),
	  zoom: 8,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	var map = new google.maps.Map(document.getElementById("map_canvas"),
									myOptions);
		
	$.ajax({
			type: 	"GET",
			url: 	"helper/RetrieveXML.php?url=http://www.senate.gov/general/contact_information/senators_cfm.xml",
			datatype: "xml",
			success: function(xml){
				alert(xml);		
			}
	});
}