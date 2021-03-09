

<?php
    $json = file_get_contents('php://input');
    
    // Converts it into a PHP object
    $payload = (object)json_decode($json, false);

    function debug_to_console($data) {
        $output = $data;
        if (is_array($output))
            $output = implode(',', $output);

        echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
    }

    // naive validation
    function validate_payload($data){
        if(!property_exists($data, 'uid')){
            return False;
        }
        if(!property_exists($data, 'username')){
            return False;
        }
        if(!property_exists($data, 'module') || !is_numeric($data->module)){
            return False;
        }
        if(!property_exists($data, 'lesson') || !is_numeric($data->lesson)){
            return False;
        }
        if(!property_exists($data, 'state')){
            return False;
        }
        return True;
    }

    function bool_to_string($bool){
        return $bool ? "true" : "false";
    }

    function fail(){
        http_response_code(400);
        exit();
    }

    if(!validate_payload($payload)){
        fail();
    }

    $sqliteDebug = true;

    try {
        // connect to your database
        $db = new SQLite3('./db.sqlite');
        $db->busyTimeout(5000);
        // WAL mode has better control over concurrency.
        // Source: https://www.sqlite.org/wal.html
        $db->exec('PRAGMA journal_mode = wal;');
    }
    catch (Exception $exception) {
        // sqlite3 throws an exception when it is unable to connect
        echo '<p>There was an error connecting to the database!</p>';
        if ($sqliteDebug) {
            echo $exception->getMessage();
        }
        http_response_code(500);
        exit();
    }

    $timestamp = date("Y-m-d H:i:s");

    $statement = $db->prepare("INSERT INTO events (uid, username, module, lesson, state, timestamp) VALUES (:uid, :username, :module, :lesson, :state, :timestamp)");
    if(!$statement){
        echo "statement failed\n";
        echo $statement;
        fail();
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

    $db->close();

    echo "ok";
?>