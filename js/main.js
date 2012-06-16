function initialize() {
	var myOptions = {
	  center: new google.maps.LatLng(39.504041,-102.216797),
	  zoom: 4,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	var map = new google.maps.Map(document.getElementById("continental"),
									myOptions);
	
	var small_map = new google.maps.Map(document.getElementById("hawaii"),
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