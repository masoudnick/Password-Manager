<?php

require_once __DIR__ . "/../Models/Password.php";


class PasswordController{

    private $passwordModel;

    function __construct()
    {
        $this->passwordModel = new Password();
    }

    public function list()
    {
        try {
            $passwords = $this->passwordModel->list();
            echo json_encode(['status' => 'success', 'data' => $passwords]);
        } catch (Exception $e) {
            Response::abort(500, 'Error => File: ' . $e->getFile() . ' Line: ' . $e->getLine() . ' Message: ' . $e->getMessage());
        }
    }
}



?>