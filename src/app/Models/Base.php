<?php

require_once __DIR__ . "/../Core/Database.php";

class Base {
    protected $pdo;
    function __construct()
    {
        $this->pdo = (new Database())->connect();
    }
}


?>