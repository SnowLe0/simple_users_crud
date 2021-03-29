<?php

require 'vendor/autoload.php';

use Dotenv\Dotenv;
use Src\System\DatabaseConnection;

$dotenv = Dotenv::createImmutable(__DIR__ . '/config');
$dotenv->load();

$dbConnection = (new DatabaseConnection())->getConnection();