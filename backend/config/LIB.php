<?php 


if (!class_exists('LIB')) {

	class LIB {

		public static function isLocal () {
			$_file = __FILE__;
			if (strpos($_file, '\xampp\htdocs') !== false) {
				return true;
			}
			return false;
	        // if (isset($_SERVER['SERVER_NAME']) && $_SERVER['SERVER_NAME'] != 'localhost') {
	        //     return false;
	        // }
	        // return true;
	    }
    }
}




?>