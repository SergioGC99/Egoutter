<?php
	//use files
	require_once('connection.php');
	require_once('exceptions.php');	
	
	class Plant extends Connection
	{
		//attributes
		private $id;
		private $temperature;
		private $moisture;
		private $humidity;
        private $dateT;
		//methods
		public function get_id() { return $this->id; }
		public function set_id($value) { $this->id = $value; }
		
		public function get_temperature() { return $this->temperature; }
		public function set_temperature($value) { $this->temperature = $value; }
        
        public function get_moisture() { return $this->moisture; }
		public function set_moisture($value) { $this->moisture = $value; }

		public function get_humidity() { return $this->humidity; }
		public function set_humidity($value) { $this->humidity = $value; }
		
		public function get_dateT() { return $this->dateT; }
		public function set_dateT($value) { $this->dateT = $value; }
		//constructor
		function __construct()
		{
			//if no arguments received, create empty object
			if(func_num_args() == 0) 
			{
				$this->id=0;
				$this->moisture=0;
				$this->temperature=0;
				$this->humidity=0;
				$this->dateT="";
			}
			if(func_num_args() == 1)
			{
				//receive arguments into an array
				$args = func_get_args();
				//id
				$id = $args[0];
				//open connection to MySql
				parent::open_connection();
				//query
				$query = "SELECT `id`, `moisture`, `date`, `temperature`, `humidity` FROM `plant` WHERE `id` = ?";
				//prepare command
				$command = parent::$connection->prepare($query);
				//link parameters
				$command->bind_param('i', $id);
				//execute command
				$command->execute();
				//link results to class attributes
				$command->bind_result($this->id, $this->moisture, $this->dateT, $this->temperature, $this->humidity);
				//fetch data
				$found = $command->fetch();
				//close command
				mysqli_stmt_close($command);
				//close connection
				parent::close_connection();
				//if not found throw exception
				if(!$found){
					$this->id=0;
                    $this->moisture=0;
					$this->temperature=0;
					$this->humidity=0;
                    $this->dateT="";
				}
			}
		}
				
	}
?>