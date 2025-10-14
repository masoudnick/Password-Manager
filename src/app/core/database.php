<?php

class Database{
    private $host = "localhost";
    private $dbname = "password_manager";
    private $username = "root";
    private $password = "";
    private static $conn;

    function __construct()
    {
        
    }

}





try {
    $conn = new mysqli($host, $username, $password, $dbname);
    $conn->query("CREATE DATABASE IF NOT EXISTS $dbname");

    $query = "CREATE TABLE IF NOT EXISTS $tableName (
        id INT AUTO_INCREMENT PRIMARY KEY,
        site VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(192) NOT NULL,
        status BOOLEAN DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";

    $conn->query($query);
}
catch (Exception $e) {
    echo json_encode(["status" => 500, "message" => "Error!"]);
}

?>