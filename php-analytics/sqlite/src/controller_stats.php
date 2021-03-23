<?php

  function get_stat($db, $module){
    $query = "select COUNT(*) as a_count from(select * from events where module = \"{$module}\" and state = 1 group by lesson, uid, username)";
    
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
    $result["total_users"] = get_stat($db, "landing");    
    $result["completed_lessons_m1"] = get_stat($db, "1");    
    $result["completed_lessons_m2"] = get_stat($db, "2");    
    $result["completed_lessons_m3"] = get_stat($db, "3");    
    $result["completed_lessons_m4"] = get_stat($db, "4");    


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