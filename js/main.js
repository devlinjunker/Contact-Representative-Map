$(document).ready(function(){
	$.ajax({
			type: 	"GET",
			url: 	"http://www.senate.gov/general/contact_information/senators_cfm.xml",
			datatype: "xml",
			success:function(xml){
						alert(xml);
					}
			});
			
			
});