<?php

  require 'bootstrap.php';
  require "router.php";
  require 'controller_event.php';
  require 'controller_stats.php';

  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
  header("Access-Control-Max-Age: 3600");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


  $token = router_parse_authorization();

  //
  // init db
  $db = db_init();

  //
  // authenticate the request with Okta:
  if (!bootstrap_authenticate($token)) {
    // http_response_code(401);
    // exit('Unauthorized');
  } 

  // endpoints for /event
  // everything else results in a 404 Not Found
  router_add('/api/event', function ($method, $uri, $query, $payload) {
    return controller_event(db(), $method, $uri, $query, $payload);
  });
  
  router_add('/api/stats', function ($method, $uri, $query, $payload) {
    return controller_stats(db(), $method, $uri, $query, $payload);
  });

  router_not_found(function($path){
    exit();
  });

  router_dispatch();

  //
  // clean exit
  db_close();
?>