<?php
	//allow access to API
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Headers: user, token');
	//use files
	require_once('catalogs.php');
	require_once('exceptions.php');
	require_once('plant.php');
	// get headers
	$headers = getallheaders();
	//validate parameter and headers
		
		$json = '{ "status" : 0, "plant" : [';
		$first = true;
		
		foreach(Catalogs::get_temperatures() as $t)
		{
			if($first) $first=false; else $json .= ',';
				$json .= ' { 
						"id" : '.$t->get_id().',
						"temperature" : "'.$t->get_temperature().'",
						"moisture" : "'.$t->get_moisture().'",
						"humidity" : "'.$t->get_humidity().'",
						"date" : "'.$t->get_dateT().'"}';
		}		
		$json .= '] }';		
		echo $json;
	
?>




