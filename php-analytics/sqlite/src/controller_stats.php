<?php

  function get_count_landing_users($db){
    $query = "
    select count(*) from 
    (
      select count (*) as c from 
        (select * from events where module = \"landing\" and lesson = \"landing\" and state = \"done\" group by uid) 
      group by uid
    );
    ";
    
    $response = $db->query($query);
    if(!$response){
      http_response_code(500);
      exit();
    }

    // only ever expect one row and one column
    return $response->fetchArray()[0];
  }
  
  function get_count_home_users($db){
    $query = "
    select count(*) from 
    (
      select count (*) as c from 
        (select * from events where module = \"home\" and lesson = \"home\" and state = \"done\" group by uid) 
      group by uid
    );
    ";
    
    $response = $db->query($query);
    if(!$response){
      http_response_code(500);
      exit();
    }

    // only ever expect one row and one column
    return $response->fetchArray()[0];
  }

  function get_completed_module_count($db, $module, $lessonsPerModule){
    $query = "
    select count(*) from 
    (
      select count (*) as c from 
        (select * from events where module = \"{$module}\" and state = \"done\" group by lesson, uid, username) 
      group by username, uid
    ) where c = {$lessonsPerModule};
    ";
    
    $response = $db->query($query);
    if(!$response){
      http_response_code(500);
      exit();
    }

    // only ever expect one row and one column
    return $response->fetchArray()[0];
  }
  
  
    function get_completed_station_count($db, $module){
    $query = "select COUNT(*) as a_count from(select * from events where module = \"{$module}\" and state = \"done\" group by lesson, uid, username)";
    
    $response = $db->query($query);
    if(!$response){
      http_response_code(500);
      exit();
    }

    // only ever expect one row and one column

    return $response->fetchArray()[0];
  }

  //
  // GET /stats
  function controller_stats_get($db) {
    
    $result = Array();
    $result["completed_landing"] = get_count_landing_users($db);    
    $result["completed_home"] = get_count_home_users($db);    
    $result["completed_lessons_m1"] = get_completed_station_count($db, "1");    
    $result["completed_lessons_m2"] = get_completed_station_count($db, "2");    
    $result["completed_lessons_m3"] = get_completed_station_count($db, "3");    
    $result["completed_lessons_m4"] = get_completed_station_count($db, "4");    

    $module_1_lesson_count = 5;
    $module_2_lesson_count = 8;
    $module_3_lesson_count = 5;
    $module_4_lesson_count = 5;

    $result["completed_module_m1"] = get_completed_module_count($db, "1", $module_1_lesson_count);    
    $result["completed_module_m2"] = get_completed_module_count($db, "2", $module_2_lesson_count);    
    $result["completed_module_m3"] = get_completed_module_count($db, "3", $module_3_lesson_count);    
    $result["completed_module_m4"] = get_completed_module_count($db, "4", $module_4_lesson_count);    


    http_response_code(200);
    echo json_encode($result);
  }

  //
  // url form /param/param ?query body
  function controller_stats($db, $method, $params, $query, $body) {
    response_to_console($method,'event');
    switch ($method) {
      case 'GET':
        controller_stats_get($db);
        break;
      case 'POST':
        break;
      case 'PUT':
        break;
      case 'DELETE':
        break;
      default:
      http_response_code(400);
      break;
    }
  }
?>