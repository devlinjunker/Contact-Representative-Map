<?php
	header("content-type: application/xml charset:utf-8");
	$url = $_GET['url'];
	
	if(strlen($url) >= 13 ) { 
		$xml = file_get_contents(urldecode($_GET["url"])); 
		
		echo $xml;
		
		/************* JSON Conversion ***********
		if($xml) { 
			$data = @simplexml_load_string($xml, "SimpleXMLElement", LIBXML_NOCDATA); 
		
			$json = json_encode($data); 
			echo isset($_GET["callback"]) ? $_GET["callback"]."($json)" : 
											$json; 
		} */
	} 
?>