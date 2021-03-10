<?php

  require 'bootstrap.php';
  require 'controller_event.php';

  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
  header("Access-Control-Max-Age: 3600");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

  $query = $_GET ?? [];
  $method = $_SERVER["REQUEST_METHOD"];
  $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
  $uri = explode( '/', $uri );
  $token = $_SERVER['Authorization'];

  //
  // init db
  $db = db_init();

  //
  // authenticate the request with Okta:
  if (!bootstrap_authenticate($token)) {
    // http_response_code(401);
    // exit('Unauthorized');
  } 

  //
  // parse payload
  $payload = bootstrap_parse_payload();

  

  // endpoints for /event
  // everything else results in a 404 Not Found
  if ($uri[1] === 'event') {
    controller_event($db, $method, $uri, $query, $payload);
  } else {
    http_response_code(400);
    exit();
  }

  //
  // clean exit
  db_close($db);
?>