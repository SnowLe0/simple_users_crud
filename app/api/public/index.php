<?php

require "../bootstrap.php";

use Src\Controller\UserController;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$requestMethod = $_SERVER["REQUEST_METHOD"];

$uri = parse_url($_SERVER['REQUEST_URI']);
parse_str($uri['query'], $uriQuery);
$uriPath = explode('/', $uri['path']);

if ($uriPath[1] !== 'users') {
    header("HTTP/1.1 404 Not Found");
    exit();
}

$userId = null;
if (isset($uriPath[2])) {
    $userId = (int)$uriPath[2];
}

$controller = new UserController($dbConnection, $uriQuery, $requestMethod, $userId);
$controller->processRequest();