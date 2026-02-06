<?php

require_once "Base.php";

class Password extends Base{

    public function store(array $data){
        try {
            $stmt = $this->pdo->prepare("
            INSERT INTO passwords (site, username, password)
            VALUES (:site, :username, :password)");
            return $stmt->execute($data);
        } catch (Exception $e) {
            Response::abort(500, 'Error => File: ' . $e->getFile() . ' Line: ' . $e->getLine() . ' Message: ' . $e->getMessage());
        }
    }

    public function list() : array{
        try {
            $stmt = $this->pdo->query("SELECT id, site, username, password FROM passwords WHERE status = 1 AND id IN (SELECT MAX(id) FROM passwords GROUP BY site)");
            return $stmt->fetchAll();
        } catch (Exception $e) {
            return [];
        }
    }

    public function getByID(string $site) : array{
        try {
            $stmt = $this->pdo->prepare("SELECT id, username, password FROM passwords WHERE status = 1 AND site = :site");
            $stmt->execute([':site' => $site]);
            return $stmt->fetchAll();
        } catch (Exception $e) {
            return [];
        }
    }

    public function update(array $data) : bool{
        try {
            
            $query = "UPDATE passwords SET username=:username, password=:password WHERE id = :id";
            $stmt = $this->pdo->prepare($query);
            return $stmt->execute([':username' => $data['username'], ':password' => $data['password'], ':id' => $data['id']]);
        } catch (Exception $e) {
            Response::abort(500, 'Error => File: ' . $e->getFile() . ' Line: ' . $e->getLine() . ' Message: ' . $e->getMessage());
        }
    }

    public function delete(int $id): bool{
        try {
            $stmt = $this->pdo->prepare("UPDATE passwords SET status=0 WHERE id = :id");
            return $stmt->execute([':id' => $id]);
        } catch (Exception $e) {
            Response::abort(500, 'Error => File: ' . $e->getFile() . ' Line: ' . $e->getLine() . ' Message: ' . $e->getMessage());
        }
    }
}



?>