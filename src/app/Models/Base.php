<?php

require_once "../Core/Database.php";

class Base {
    protected $pdo;
    function __construct()
    {
        $this->pdo = (new Database())->connect();
    }
}







?>