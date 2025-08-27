<?php 
session_start();
include '../config/config.php';
include '../config/config_db.php';

if (isLocal()) {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
}

$table = 'contacts';

$res = new Res();
$post = $_POST;

if (empty($post['action'])) {
    exit;
}

if ($post['action'] == 'add_contact') {
    $name = trim($post['name']);
    $email = trim($post['email']);
    $phone = trim($post['phone']);
    $subject = trim($post['subject']);
    $message = trim($post['message']);

    if (empty($email) || empty($email) || empty($subject) || empty($message)) {
        $res->exit();
    }

    DB::table($table)->insert([
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'subject' => $subject,
        'message' => $message,
    ]);

    $res->success();
}


















?>