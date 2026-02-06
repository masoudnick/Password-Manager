<?php

class Routes{

    private $routes = [
        "GET" => [],
        "POST" => [],
        "DELETE" => [],
        "PUT" => [],
    ];

    public function get(string $endpoint, $controller){
        $this->add("GET", $endpoint, $controller);
    }
    public function post(string $endpoint, $controller){
        $this->add("POST", $endpoint, $controller);
    }

    private function add($method, $endpoint, $controller){
        $this->routes[$method][$endpoint] = $controller;
    }

    public function dispatch($endpoint, $method)
    {
        $route = $this->routes[$method][$endpoint] ?? null;
        if ($route) {
            $controller = $this->routes[$method][$endpoint][0];
            $controllerMethod = $this->routes[$method][$endpoint][1];
            call_user_func([new $controller(), $controllerMethod]);
        }
        else{
            Response::abort(404, 'Route not found');
        }
    }
}
