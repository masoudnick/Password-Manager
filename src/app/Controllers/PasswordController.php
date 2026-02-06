<?php

require_once __DIR__ . "/../Models/Password.php";


class PasswordController
{

    private $passwordModel;

    function __construct()
    {
        $this->passwordModel = new Password();
    }
    private function encryptPassword(string $password, string $key): string
    {
        $iv = openssl_random_pseudo_bytes(16);
        $encrypted = openssl_encrypt($password, 'AES-256-CBC', $key, OPENSSL_RAW_DATA, $iv);
        return base64_encode($iv . $encrypted);
    }

    private function decryptPassword(string $password, string $key): string
    {
        $data = base64_decode($password);
        $iv = substr($data, 0, 16);
        $encrypted = substr($data, 16);
        return openssl_decrypt($encrypted, 'AES-256-CBC', $key, OPENSSL_RAW_DATA, $iv);
    }

    private function fetchFavIcon(string $domain): string
    {
        if (!$domain) {
            return "";
        }
        $ch = curl_init("https://favicone.com/{$domain}?s=32&json");
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 5,
            CURLOPT_SSL_VERIFYPEER => true,
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode >= 200 && $httpCode < 300) {
            $result = json_decode($response, true);
            return $result['icon'];
        }
        return "";
    }

    public function store()
    {
        try {
            $data = json_decode(file_get_contents("php://input"), true);
            $site = $data['site'] ?? '';
            $username = $data['username'] ?? '';
            $password = $data['password'] ?? '';
            if (empty($site) || empty($username) || empty($password)) {
                Response::abort(400, 'All fields are required');
                return;
            }
            $masterKey = getenv('MASTER_KEY');
            $data['password'] =  $this->encryptPassword($password, $masterKey);
            echo json_encode(['ok' => $this->passwordModel->store($data)]);
        } catch (Exception $e) {
            echo json_encode(['ok' => false]);
        }
    }

    public function list()
    {
        try {
            $masterKey = getenv('MASTER_KEY');
            $result = $this->passwordModel->list();
            $passwords = [];
            foreach ($result as $row) {
                $decriptedPassword =  $this->decryptPassword($row['password'], $masterKey);
                // $favIcon = $this->fetchFavIcon($row["site"]);
                $favIcon = "";
                $passwords[] = ['id' => $row["id"], 'site' => $row["site"], 'username' => $row["username"], 'password' => $decriptedPassword, 'icon' => $favIcon];
            }
            echo json_encode(['ok' => true, 'data' => $passwords]);
        } catch (Exception $e) {
            echo json_encode(['ok' => false]);
        }
    }
    public function getByID()
    {
        try {
            $data = json_decode(file_get_contents("php://input"), true);
            $site = $data['site'] ?? '';
            if (empty($site)) {
                Response::abort(400, 'Parameters are missing or incomplete');
                return;
            }
            $masterKey = getenv('MASTER_KEY');
            $result = $this->passwordModel->getByID($site);
            $passwords = [];
            foreach ($result as $row) {
                $decriptedPassword =  $this->decryptPassword($row['password'], $masterKey);
                $passwords[] = ['id' => $row["id"], 'username' => $row["username"], 'password' => $decriptedPassword];
            }
            echo json_encode(['ok' => true, 'data' => $passwords]);
        } catch (Exception $e) {
            echo json_encode(['ok' => false]);
        }
    }

    public function update()
    {
        try {
            $masterKey = getenv('MASTER_KEY');
            $data = json_decode(file_get_contents("php://input"), true);
            $id = $data['id'] ?? '';
            $username = $data['username'] ?? '';
            $password = $data['password'] ?? '';
            if (empty($id) || empty($username) || empty($password)) {
                Response::abort(400, 'Parameters are missing or incomplete');
                return;
            }
            $data['password'] = $this->encryptPassword($password, $masterKey);
            $result = $this->passwordModel->update($data);
            echo json_encode(['ok' => $result]);
        } catch (Exception $e) {
            Response::abort(500, 'Error => File: ' . $e->getFile() . ' Line: ' . $e->getLine() . ' Message: ' . $e->getMessage());
            echo json_encode(['ok' => $result]);
        }
    }
    public function delete()
    {
        try {
            $data = json_decode(file_get_contents("php://input"), true);
            $id = $data['id'] ?? '';
            if (empty($id)) {
                Response::abort(400, 'Parameters are missing or incomplete');
                return;
            }

            echo json_encode(['ok' => $this->passwordModel->delete($id)]);
        } catch (Exception $e) {
            Response::abort(500, 'Error => File: ' . $e->getFile() . ' Line: ' . $e->getLine() . ' Message: ' . $e->getMessage());
        }
    }
}
