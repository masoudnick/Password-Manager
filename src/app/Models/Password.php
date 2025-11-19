<?php

require_once "Base.php";

class Password extends Base{

    public function list(){

        try {
            $stmt = $this->pdo->query("SELECT * FROM passwords");
            return $stmt->fetchAll();
        } catch (Exception $e) {
            Response::abort(500, 'Error => File: ' . $e->getFile() . ' Line: ' . $e->getLine() . ' Message: ' . $e->getMessage());
        }
    }
}



?>