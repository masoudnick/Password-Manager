<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/Core/Database.php';
require_once __DIR__ . '/Controllers/PasswordController.php';
require_once __DIR__ . '/Core/Routes.php';

(new Database())->createTables();

$router = new Routes();
$router->get("/read/passwords", [PasswordController::class, "list"]);
$router->post("/read/password", [PasswordController::class, "getByID"]);
$router->post("/create/password", [PasswordController::class, "store"]);
$router->post("/delete/password", [PasswordController::class, "delete"]);
$router->post("/update/password", [PasswordController::class, "update"]);


$router->dispatch($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);

?>