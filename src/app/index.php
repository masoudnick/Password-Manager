<?php

header("Access-Control-Allow-Origin: *");
require_once __DIR__ . '/Core/Database.php';
require_once __DIR__ . '/Controllers/PasswordController.php';
require_once __DIR__ . '/Core/Routes.php';


(new Database())->createTables();

$router = new Routes();
$router->get("/api/passwords", [PasswordController::class, "list"]);


$router->dispatch($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);

?>