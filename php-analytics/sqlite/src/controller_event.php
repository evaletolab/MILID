<?php
  //
  // naive security
  function controller_event_security_post($token, $method) {

  }

  //
  // naive validation
  function controller_event_validate($data){
      if(!property_exists($data, 'uid')){
          return False;
      }
      if(!property_exists($data, 'username')){
          return False;
      }
      if(!property_exists($data, 'module') || !is_string($data->module)){
          return False;
      }
      if(!property_exists($data, 'lesson') || !is_string($data->lesson)){
          return False;
      }
      if(!property_exists($data, 'state') || !is_string($data->state)){
          return False;
      }
      return True;
  }

  //
  // GET /event?filter
  function controller_event_get($db,$id,$query) {
    $filter = $query["filter"];


  
    if(!$id && $filter) {
      $id = $filter;
    }

    if(!is_null($id)){
      // echo "complex get " . $id . "\n";
      $statement = $db->prepare("SELECT uid,username,module,lesson,state,timestamp FROM events WHERE uid = :uid;");
      $statement->bindValue(':uid', $id);
    }else{
      // echo "simple get \n";
      $statement = $db->prepare("SELECT uid,username,module,lesson,state,timestamp FROM events;");  
    }

    if(!$statement){
        echo "statement failed\n";
        echo $statement;
        response_fail();
        exit();
    }

    $res = $statement->execute();

    if(!$res){
        echo $sqlite->lastErrorMsg();
        http_response_code(500);
        exit();
    }
    $jsonArray = array();
    while($row = $res->fetchArray(SQLITE3_ASSOC)){ 
      $jsonArray[] = $row;
    }

    
    // free the memory, this in NOT done automatically, while your script is running
    $res->finalize();
    http_response_code(200);
    echo json_encode($jsonArray);
  }

  //
  // POST /event $payload
  function controller_event_add($db, $payload) {
    if(!controller_event_validate($payload)){
      response_fail();
    }

    $timestamp = date("Y-m-d H:i:s");
    $statement = $db->prepare("INSERT INTO events (uid, username, module, lesson, state, timestamp) VALUES (:uid, :username, :module, :lesson, :state, :timestamp)");
    if(!$statement){
        echo "statement failed\n";
        echo $statement;
        response_fail();
    }
    $statement->bindValue(':uid', $payload->uid);
    $statement->bindValue(':username', $payload->username);
    $statement->bindValue(':module', $payload->module);
    $statement->bindValue(':lesson', $payload->lesson);
    $statement->bindValue(':state', $payload->state);
    $statement->bindValue(':timestamp', $timestamp);
    
    $res = $statement->execute();

    if(!$res){
        echo $sqlite->lastErrorMsg();
        http_response_code(500);
        exit();
    }
    
    // free the memory, this in NOT done automatically, while your script is running
    $res->finalize();
    http_response_code(200);
    echo json_encode($payload);
  }

  //
  // url form /param/param ?query body
  function controller_event($db, $method, $params, $query, $body) {
    response_to_console($method,'event');
    switch ($method) {
      case 'GET':
        controller_event_get($db, $params[3],$query);
        break;
      case 'POST':
        controller_event_add($db, $body);
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