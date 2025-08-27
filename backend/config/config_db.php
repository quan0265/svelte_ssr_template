<?php 

include 'DB.php';

if (!class_exists('Res')) {
	class Res {
		public $status = 'error';
		// public $message = 'Vui lòng kiểm tra lại thông tin';
		public $message = 'Please check the information again';
		public $row = null;
		public $item = null;
		public $rows = [];
		public $list = [];
		public $data = [];

		function __construct ($status='error') {
			$this->status = $status;
			// $this->message = '';
		}

		public function getProperties() {
			$properties = get_object_vars($this);
			$result = [];
			foreach ($properties as $k => $v) {
				$result[$k] = $v;
			}
			return $result;
		}

		public function success() {
			header("Content-Type: application/json");
			$this->status = 'success';
			echo json_encode($this->getProperties());
			exit;
		}

		public function exit($message='') {
			header("Content-Type: application/json");
			if ($message) {
				$this->message = $message;
			}
			echo json_encode($this->getProperties());
			exit;
		}
	}
}

if (strpos(__FILE__, '\xampp\htdocs') !== false) {
	$config = [
		'db_host' => 'localhost',
		'db_port' => '3306',
		'db_user' => 'root',
		'db_pass' => '',
		'db_name' => 'work_interdogmedia.com',
		'charset' => 'utf8mb4'
	];
}
else {
	$config = [
		'db_host' => 'localhost',
		'db_port' => '3306',
		'db_user' => 'interdogmediacom',
		// 'db_pass' => 'kDY42ym^nis=]P)B4c{',
		'db_pass' => '5YGpzzsxNWUEW2c8',
		'db_name' => 'interdogmediacom',
		'charset' => 'utf8mb4'
	];
}
	
DB::connect($config);





?>