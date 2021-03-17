

<?php
    require_once('../db_connect.php');
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

    $timestamp = date("Y-m-d H:i:s");

    $query = "INSERT INTO events (uid, username, module, lesson, state, timestamp) VALUES (?,?,?,?,?,?)";
    $stmt = mysqli_prepare($dbc,$query);
    mysqli_stmt_bind_param($stmt, "ssiiis", $payload->uid, $payload->username, $payload->module, $payload->lesson, $payload->state, $timestamp);
    mysqli_stmt_execute($stmt);
    $affected_rows = mysqli_stmt_affected_rows($stmt);

    if($affected_rows == 1){
        echo "youpi\n";
        http_response_code(200);
    }else{

        echo "boum error\n";
        echo mysqli_error();
        http_response_code(500);
    }
    
    mysqli_stmt_close($stmt);
    mysqli_close($dbc);
?>