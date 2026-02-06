<?php

require_once "response.php";


class Database
{
    private $host = "localhost";
    private $dbname = "password_manager";
    private $username = "root";
    private $password = "";
    private $pdo;

    function __construct()
    {
        $this->pdo = new PDO(
            "mysql:host=" . $this->host . ";dbname=" . $this->dbname . ";charset=utf8mb4",
            $this->username,
            $this->password,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]
        );
    }

    public function createTables(): void
    {
        try {
            $sqlQueries = [
                "CREATE TABLE IF NOT EXISTS passwords (
                id INT AUTO_INCREMENT PRIMARY KEY,
                site VARCHAR(255) NOT NULL,
                username VARCHAR(255) NOT NULL,
                password VARCHAR(192) NOT NULL,
                status BOOLEAN DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )"
            ];
            foreach ($sqlQueries as $query) {
                $this->pdo->exec($query);
            }
        } catch (PDOException $e) {
            Response::abort(500, "Table creation failed: " . $e->getMessage());
        }
    }

    public function connect(): PDO
    {
        return $this->pdo;
    }
}

