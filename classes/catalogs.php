<?php
	//use files
	require_once('connection.php');
	require_once('exceptions.php');
	require_once('plant.php');
	
	class Catalogs extends Connection
	{
		public static function get_temperatures()
		{
			//open connection to MySql
			parent::open_connection();
			//initialize arrays
			$ids = array(); //array for ids
			$list = array(); //array for objects
			//query
			$query = "SELECT id FROM plant order by date desc limit 0,10;";
			//prepare command
			$command = parent::$connection->prepare($query);
			//execute command
			$command->execute();
			//link results
			$command->bind_result($id);
			//fill ids array
			while ($command->fetch()) array_push($ids, $id);
			//close command
			mysqli_stmt_close($command);
			//close connection
			parent::close_connection();
			//fill object array
			for ($i=0; $i < count($ids); $i++) array_push($list, new Plant($ids[$i]));
			//return array
			return $list;
		}
		
	}
?>