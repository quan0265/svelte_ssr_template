<?php 

if (file_exists('sellers.php')) {
    include "sellers.php";
}

$uri = $_SERVER["REQUEST_URI"];

$path = parse_url($uri);
$path_name = $path["path"];

$file_path_default = "pages/index.html";

$file_path = "pages".$path_name.".html";

if (!file_exists($file_path)) {
    $file_path = $file_path_default;
}

if (file_exists($file_path)) {
    include($file_path);
}


?>