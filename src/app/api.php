<?php
require_once "db.php";

ini_set('display_errors', 0);

// Encrypt and decrypt functions   
function encryptPassword($password, $key): string
{
    $iv = openssl_random_pseudo_bytes(16);
    $encrypted = openssl_encrypt($password, 'AES-256-CBC', $key, 0, $iv);
    return base64_encode($iv . $encrypted);
}

function decryptPassword($password, $key): string
{
    $data = base64_decode($password);
    $iv = substr($data, 0, 16);
    $encrypted = substr($data, 16);
    return openssl_decrypt($encrypted, 'AES-256-CBC', $key, 0, $iv);
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        try {
            $master_key = getenv('MASTER_KEY');
            $result = $conn->query(isset($_GET['id']) ? "SELECT id, site, username, password FROM passwords WHERE id = " . $_GET['id'] . " AND status = 1" : "SELECT id, site, username, password From passwords WHERE status = 1");
            $passwords = [];
            while ($row = $result->fetch_assoc()) {
                $decriptedPassword =  decryptPassword($row['password'], $master_key);
                $passwords[] = ['id' => $row["id"], 'site' => $row["site"], 'username' => $row["username"], 'password' => $decriptedPassword];
            }
            echo json_encode(["status" => 200, "data" => $passwords]);
        } catch (Exception $e) {
            echo json_encode(["status" => 500, "message" => "Error!"]);
        }
        break;

    case 'POST':
        try {
            $master_key = getenv('MASTER_KEY');
            $data = json_decode(file_get_contents("php://input"), true);
            $stmt = $conn->prepare("INSERT INTO $tableName (site, username, password) VALUES (?, ?, ?)");
            $encryptedPassword =  encryptPassword($data['password'], $master_key);
            $stmt->bind_param("sss", $data['site'], $data['username'], $encryptedPassword);
            $stmt->execute();
            echo json_encode(["status" => 200, "message" => "Password added successfully"]);
        } catch (Exception $e) {
            echo json_encode(["status" => 500, "message" => "Error!"]);
        }

        break;

    case 'PUT':
        try {
            $master_key = getenv('MASTER_KEY');
            $data = json_decode(file_get_contents("php://input"), true);
            $encryptedPassword =  encryptPassword($data['password'], $master_key);
            $stmt = $conn->prepare("UPDATE passwords SET username=?, password=? WHERE id=?");
            $stmt->bind_param("ssi", $data['username'], $encryptedPassword, $_GET['id']);
            $stmt->execute();
            echo json_encode(["success" => 200, "message" => "Password updated successfully"]);
            break;
        } catch (Exception $e) {
            echo json_encode(["status" => 500, "message" => "Error!"]);
        }


    case 'DELETE':
        try {
            $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $conn->prepare("UPDATE passwords SET status=0 WHERE id=?");
        $stmt->bind_param("i", $_GET['id']);
        $stmt->execute();
        echo json_encode(["success" => 200, "message" => "Password deleted successfully"]);
        break;
        } catch (Exception $e) {
            echo json_encode(["status" => 500, "message" => "Error!"]);
        }
        
}
