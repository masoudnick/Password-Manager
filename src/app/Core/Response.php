<?php

class Response{

    public static function abort(int $code, string $message){
        http_response_code($code);
        echo json_encode(['status' => 'error', 'message' => $message]);
        exit;
    }
}
